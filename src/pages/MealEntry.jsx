import React, { useState, useEffect } from "react";
import api from "../api"; // Our configured Axios instance
import { useNavigate } from "react-router-dom";

const MealEntryForm = () => {
  const [mealType, setMealType] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [foodEntries, setFoodEntries] = useState([
    { food_item_id: "", quantity: "", unit: "", servings: 1 },
  ]);
  const [foodItems, setFoodItems] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const navigate = useNavigate();

  // Fetch available food items from the API
  useEffect(() => {
    api.get("/food_items")
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.error("Error fetching food items", err));

    // Fetch meal types if applicable
    api.get("/meal_types")
      .then((res) => setMealTypes(res.data))
      .catch((err) => console.error("Error fetching meal types", err));
  }, []);

  // Add a new food entry row
  const addFoodEntry = () => {
    setFoodEntries([...foodEntries, { food_item_id: "", quantity: "", unit: "", servings: 1 }]);
  };

  // Handle change in a particular food entry
  const handleFoodEntryChange = (index, field, value) => {
    const newFoodEntries = [...foodEntries];
    newFoodEntries[index][field] = value;
    setFoodEntries(newFoodEntries);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the payload
    const payload = {
      meal: {
        meal_type_id: mealType,
        meal_time: mealTime,
        food_entries_attributes: foodEntries, // Assuming Rails accepts nested attributes
      },
    };

    api.post("/meals", payload)
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Error logging meal", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log a Meal & Food Entries</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Meal Details */}
        <div>
          <label className="block font-medium">Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Meal Type</option>
            {mealTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Meal Time:</label>
          <input
            type="datetime-local"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        
        {/* Food Entries */}
        <div>
          <h2 className="text-xl font-bold mb-2">Food Entries</h2>
          {foodEntries.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <div className="mb-2">
                <label className="block font-medium">Food Item:</label>
                <select
                  value={entry.food_item_id}
                  onChange={(e) => handleFoodEntryChange(index, "food_item_id", e.target.value)}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select Food</option>
                  {foodItems.map((food) => (
                    <option key={food.id} value={food.id}>{food.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-medium">Quantity:</label>
                <input
                  type="number"
                  value={entry.quantity}
                  onChange={(e) => handleFoodEntryChange(index, "quantity", e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Unit:</label>
                <input
                  type="text"
                  value={entry.unit}
                  onChange={(e) => handleFoodEntryChange(index, "unit", e.target.value)}
                  placeholder="e.g., gm, cup"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Servings:</label>
                <input
                  type="number"
                  value={entry.servings}
                  onChange={(e) => handleFoodEntryChange(index, "servings", e.target.value)}
                  min="1"
                  className="border p-2 w-full"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addFoodEntry}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Another Food
          </button>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Log Meal
        </button>
      </form>
    </div>
  );
};

export default MealEntryForm;
