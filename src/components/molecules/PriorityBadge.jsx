import React from "react";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, className = "" }) => {
  const variants = {
    high: "bg-gradient-to-r from-error/10 to-red-500/10 text-error border border-error/20",
    medium: "bg-gradient-to-r from-warning/10 to-orange-500/10 text-warning border border-warning/20",
    low: "bg-gradient-to-r from-success/10 to-green-500/10 text-success border border-success/20"
  };

  const labels = {
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      variants[priority] || variants.medium,
      className
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full mr-2",
        priority === "high" && "bg-error",
        priority === "medium" && "bg-warning",
        priority === "low" && "bg-success"
      )} />
      {labels[priority] || "Medium Priority"}
    </span>
  );
};

export default PriorityBadge;