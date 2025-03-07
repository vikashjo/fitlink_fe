import React, { useEffect, useState } from "react";
import api from "../api";

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    api.get("/food_items")
      .then((response) => setFoodItems(response.data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Food Items</h1>
      <ul className="mt-4">
        {foodItems.map((food) => (
          <li key={food.id} className="border p-4 my-2 rounded shadow">
            <h2 className="font-semibold">{food.name}</h2>
            <p>Calories: {food.calories}</p>
            <p>Protein: {food.protein}g</p>
            <p>Carbs: {food.carbs}g</p>
            <p>Fats: {food.fats}g</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItems;
