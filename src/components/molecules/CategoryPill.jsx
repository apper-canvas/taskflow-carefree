import React from "react";
import { cn } from "@/utils/cn";

const CategoryPill = ({ category, color, className = "" }) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        className
      )}
      style={{
        backgroundColor: `${color}15`,
        borderColor: `${color}40`,
        color: color
      }}
    >
      <div 
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      {category}
    </span>
  );
};

export default CategoryPill;