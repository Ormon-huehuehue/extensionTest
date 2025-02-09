import React from "react";

const stats = [
  { value: "23", label: "New Connections" },
  { value: "50", label: "Number of Follow" },
  { value: "46", label: "Comments Posted" },
  { value: "11", label: "Posts & Articles Published" },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col justify-end items-start p-4 h-28 border-[#efefef] bg-[#f9fbfc] border rounded-lg shadow-sm"
        >
          <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
          <span className="text-gray-600 text-[10px]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
