import React, { useState } from "react";
import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import DueDatePill from "@/components/molecules/DueDatePill";
import CategoryPill from "@/components/molecules/CategoryPill";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, categories = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await onToggleComplete(task.Id);
    setIsCompleting(false);
  };

  const categoryData = categories.find(c => c.name === task.category);
  const categoryColor = categoryData?.color || "#6366f1";

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl shadow-sm hover:shadow-premium transition-all duration-300 border-l-4 overflow-hidden",
        task.completed && "opacity-75"
      )}
      style={{ borderLeftColor: priorityColors[task.priority] }}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              className={isCompleting ? "animate-pulse" : ""}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 
                className={cn(
                  "text-lg font-semibold transition-colors cursor-pointer",
                  task.completed 
                    ? "text-gray-500 line-through" 
                    : "text-gray-900 hover:text-primary-600"
                )}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="text-gray-400 hover:text-primary-500"
                >
                  <ApperIcon name="Edit2" className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.Id)}
                  className="text-gray-400 hover:text-error"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {(isExpanded || task.description) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={cn(
                  "text-gray-600 mb-4 text-sm leading-relaxed",
                  task.completed && "line-through"
                )}
              >
                {task.description || "No description provided"}
              </motion.p>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              <CategoryPill 
                category={task.category} 
                color={categoryColor}
              />
              <PriorityBadge priority={task.priority} />
              <DueDatePill 
                dueDate={task.dueDate} 
                completed={task.completed}
              />
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 pb-4 pt-0 border-t border-gray-50"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <span>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.completedAt && (
              <span>
                Completed: {new Date(task.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </motion.div>
      )}
      
      {task.completed && task.priority === "high" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="confetti-animation" />
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;