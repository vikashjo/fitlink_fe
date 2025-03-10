import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import MealForm from "./pages/MealForm";
import FoodItems from "./pages/FoodItems";
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log-meal" element={<MealForm />} />
          <Route path="/food_item" element={<FoodItems /> } />
          <Route path="/login" element={<Login /> } />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App
