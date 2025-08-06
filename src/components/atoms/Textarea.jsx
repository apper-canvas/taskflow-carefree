import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className = "", 
  label,
  error,
  rows = 4,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white resize-vertical";
  const errorClasses = error ? "border-error focus:ring-error focus:border-error" : "";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(baseClasses, errorClasses, className)}
        {...props}
      />
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;