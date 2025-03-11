import React, { useEffect, useState } from "react";
import api from "../api";
import MacroSummary from "../pages/MacroSummary";
import MacroTrendsChart from "../pages/MacroTrendsChart";
import MealEntryForm from "../pages/MealEntry"; // Our unified form component


const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [macroGoal, setMacroGoal] = useState({});
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showMealForm, setShowMealForm] = useState(false);

  // Fetch meals based on date filter
  const fetchMeals = (dateParam = "") => {
    let url = "/meals";
    if (dateParam) url += `?date=${dateParam}`;
    api.get(url)
      .then((response) => {
        setMeals(response.data);
        const totals = response.data.reduce(
          (acc, meal) => {
            acc.calories += parseFloat(meal.total_macros.calories);
            acc.protein += parseFloat(meal.total_macros.protein);
            acc.carbs += parseFloat(meal.total_macros.carbs);
            acc.fats += parseFloat(meal.total_macros.fats);
            return acc;
          },
          { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
        setTotalMacros(totals);
      })
      .catch((error) => console.error("Error fetching meals", error));
  };

  // Fetch meals when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchMeals(selectedDate);
    } else {
      fetchMeals();
    }
  }, [selectedDate]);

  // Fetch macro goals
  useEffect(() => {
    api.get("/macro_goal")
      .then((response) => setMacroGoal(response.data))
      .catch((error) => console.error("Error fetching macro goal", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowMealForm(!showMealForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showMealForm ? "Hide Log Meal Form" : "Log a Meal"}
        </button>
      </div>

      {/* Main Layout: Sidebar and Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar (Left Column) */}
        <aside className="md:col-span-1 bg-white p-4 shadow rounded">
          {/* Date Picker & Quick Filters */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={() => setSelectedDate("")}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Show All Meals
            </button>
          </div>
          {/* Daily Macro Summary */}
          <MacroSummary macroGoal={macroGoal} totalMacros={totalMacros} />
          {/* (Optionally, include profile info or quick actions here) */}
        </aside>

        {/* Main Content (Right Columns) */}
        <main className="md:col-span-2">
          {/* Conditional Meal Logging Form */}
          {showMealForm && (
            <div className="mb-6">
              <MealEntryForm
                onSuccess={() => {
                  setShowMealForm(false);
                  fetchMeals(selectedDate);
                }}
              />
            </div>
          )}
          {/* Weekly Trend Chart */}
          <div className="mb-6 bg-white p-4 shadow rounded">
            <MacroTrendsChart />
          </div>
          {/* Meal Logs List */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">Meal Logs</h2>
            <ul className="divide-y divide-gray-200">
              {meals.map((meal) => (
                <li key={meal.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{meal.meal_type.name}{meal.meal}</h3>
                    <span className="text-gray-600 text-sm">{meal.meal_time}</span>
                  </div>
                  <div className="mt-2">
                    <p>Calories: {meal.total_macros.calories}</p>
                    <p>Protein: {meal.total_macros.protein}</p>
                    <p>Carbs: {meal.total_macros.carbs}</p>
                    <p>Fats: {meal.total_macros.fats}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
