import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null, 
  onRetry,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
  categories = [],
  emptyMessage = "No tasks found",
  emptyDescription = "Start by creating your first task to get organized"
}) => {
  if (loading) {
    return <Loading variant="skeleton" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyMessage}
        description={emptyDescription}
        action={onAddTask}
        actionLabel="Add Your First Task"
        icon="CheckSquare"
      />
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {tasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            categories={categories}
          />
        ))}
      </AnimatePresence>
      
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-500 text-sm">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} shown
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;