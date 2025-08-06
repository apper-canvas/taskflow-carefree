import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className = "", 
  label,
  error,
  children,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer";
  const errorClasses = error ? "border-error focus:ring-error focus:border-error" : "";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(baseClasses, errorClasses, className)}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;