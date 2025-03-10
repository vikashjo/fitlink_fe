import React from "react";

const MacroSummary = ({ macroGoal, totalMacros }) => {
  // Calculate progress percentages
  const calculateProgress = (goal, actual) =>
    goal ? Math.min((actual / goal) * 100, 100) : 0;

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Daily Macro Summary</h2>
      {["calories", "protein", "carbs", "fats"].map((macro) => (
        <div key={macro} className="mb-2">
          <p className="font-medium capitalize">
            {macro}: {totalMacros[macro]} / {macroGoal[macro]}
          </p>
          <div className="w-full bg-gray-200 h-4 rounded">
            <div
              className="bg-green-500 h-4 rounded"
              style={{
                width: `${calculateProgress(macroGoal[macro], totalMacros[macro])}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MacroSummary;
