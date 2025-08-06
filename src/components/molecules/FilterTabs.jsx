import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    {
      id: "all",
      label: "All Tasks",
      icon: "List",
      count: taskCounts.all || 0
    },
    {
      id: "active",
      label: "Active",
      icon: "Clock",
      count: taskCounts.active || 0
    },
    {
      id: "completed",
      label: "Completed",
      icon: "CheckSquare",
      count: taskCounts.completed || 0
    }
  ];

  return (
    <div className="flex space-x-1 bg-gray-50 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            activeFilter === filter.id
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          <ApperIcon name={filter.icon} className="w-4 h-4" />
          <span>{filter.label}</span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            activeFilter === filter.id
              ? "bg-primary-100 text-primary-600"
              : "bg-gray-200 text-gray-600"
          )}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;