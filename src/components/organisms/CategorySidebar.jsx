import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ 
  categories = [], 
  selectedCategory, 
  onCategorySelect,
  taskCounts = {}
}) => {
  const allTasksCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <ApperIcon name="Folder" className="w-5 h-5 mr-2 text-primary-500" />
        Categories
      </h2>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left",
            selectedCategory === null
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
              : "hover:bg-gray-100 text-gray-700"
          )}
        >
          <div className="flex items-center">
            <div className={cn(
              "w-3 h-3 rounded-full mr-3",
              selectedCategory === null ? "bg-white" : "bg-gray-400"
            )} />
            <span className="font-medium">All Tasks</span>
          </div>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            selectedCategory === null
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-600"
          )}>
            {allTasksCount}
          </span>
        </button>
        
        {categories.map((category) => (
          <motion.button
            key={category.Id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(category.name)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left",
              selectedCategory === category.name
                ? "text-white shadow-md"
                : "hover:bg-gray-100 text-gray-700"
            )}
            style={selectedCategory === category.name ? {
              background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`
            } : {}}
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              selectedCategory === category.name
                ? "bg-white/20 text-white"
                : "bg-gray-200 text-gray-600"
            )}>
              {taskCounts[category.name] || 0}
            </span>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
        <div className="flex items-center mb-2">
          <ApperIcon name="TrendingUp" className="w-4 h-4 text-primary-600 mr-2" />
          <span className="text-sm font-medium text-primary-900">Productivity Tip</span>
        </div>
        <p className="text-xs text-primary-700 leading-relaxed">
          Break large tasks into smaller, manageable chunks to maintain momentum and feel accomplished.
        </p>
      </div>
    </div>
  );
};

export default CategorySidebar;