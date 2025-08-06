import React from "react";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const DueDatePill = ({ dueDate, completed = false, className = "" }) => {
  if (!dueDate) return null;

  const date = parseISO(dueDate);
  const isOverdue = !completed && isPast(date) && !isToday(date);
  const isDueToday = isToday(date);
  const isDueTomorrow = isTomorrow(date);

  let displayText = "";
  let variant = "default";

  if (isDueToday) {
    displayText = "Due Today";
    variant = "today";
  } else if (isDueTomorrow) {
    displayText = "Due Tomorrow";
    variant = "tomorrow";
  } else if (isOverdue) {
    displayText = "Overdue";
    variant = "overdue";
  } else {
    displayText = format(date, "MMM d");
    variant = "future";
  }

  const variants = {
    today: "bg-gradient-to-r from-info/10 to-blue-500/10 text-info border border-info/20",
    tomorrow: "bg-gradient-to-r from-secondary-500/10 to-purple-500/10 text-secondary-600 border border-secondary-500/20",
    overdue: "bg-gradient-to-r from-error/10 to-red-500/10 text-error border border-error/20 animate-pulse-soft",
    future: "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border border-gray-200",
    default: "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border border-gray-200"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      <ApperIcon name="Calendar" className="w-3 h-3 mr-1.5" />
      {displayText}
    </span>
  );
};

export default DueDatePill;