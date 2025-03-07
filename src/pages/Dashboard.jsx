import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/meals") // Update with actual API endpoint
      .then((response) => setMeals(response.data))
      .catch((error) => console.error("Error fetching meals", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meal Logs</h1>
      <Link to="/log-meal" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Meal
      </Link>
      <ul className="mt-4">
        {meals.map((meal) => (
          <li key={meal.id} className="border p-4 my-2 rounded shadow">
            <h2 className="font-semibold">{meal.meal_type.name}</h2>
            <p>Time: {meal.meal_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
