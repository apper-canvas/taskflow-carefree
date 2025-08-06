import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md",
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    danger: "bg-gradient-to-r from-error to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;