import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks found", 
  description = "Start by creating your first task to get organized",
  action,
  actionLabel = "Add Task",
  icon = "CheckSquare",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 text-center ${className}`}>
      <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <ApperIcon name={icon} className="w-16 h-16 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {action && (
        <Button
          onClick={action}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-4 rounded-xl shadow-floating hover:scale-105 transition-all duration-300 font-medium"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;