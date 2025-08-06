import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  label,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300",
          checked 
            ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 shadow-md" 
            : "border-gray-300 hover:border-primary-400 group-hover:border-primary-400",
          className
        )}>
          {checked && (
            <ApperIcon 
              name="Check" 
              className="w-3 h-3 text-white animate-bounce-in" 
            />
          )}
        </div>
      </div>
      {label && (
        <span className="text-gray-700 select-none">{label}</span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;