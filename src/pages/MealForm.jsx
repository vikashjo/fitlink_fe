import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const MealForm = () => {
  const [mealType, setMealType] = useState("");
  const [mealTime, setMealTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use a relative URL so that the Axios instance's baseURL and interceptors are used.
    api.post("/meals", {
      meal_type_id: mealType,
      meal_time: mealTime
    })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error logging meal", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log a Meal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Meal Type ID"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="datetime-local"
          value={mealTime}
          onChange={(e) => setMealTime(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Meal
        </button>
      </form>
    </div>
  );
};

export default MealForm;
