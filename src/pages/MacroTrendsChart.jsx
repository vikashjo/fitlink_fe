import React, { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import api from "../api";

const MacroTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/meals/macro_trends?range=week")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching macro trends", error));
  }, []);

  if (!data.length) {
    return (
      <div className="p-4 border rounded shadow">
        <p className="text-center text-gray-600">No weekly trend data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Weekly Calorie Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="calories" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroTrendsChart;

