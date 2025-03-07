import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import MealForm from "./pages/MealForm";
import FoodItems from "./pages/FoodItems";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log-meal" element={<MealForm />} />
        <Route path="/food_item" element={<FoodItems /> } />
      </Routes>
    </Router>
  );
}

export default App
