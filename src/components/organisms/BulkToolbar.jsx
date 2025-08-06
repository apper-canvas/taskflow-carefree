import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const BulkToolbar = ({ 
  selectedTasks = [], 
  totalTasks = 0,
  onSelectAll, 
  onClearSelection,
  onBulkComplete,
  onBulkDelete,
  onBulkPriorityUpdate 
}) => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const selectedCount = selectedTasks.length;
  const allSelected = selectedCount === totalTasks && totalTasks > 0;
  const completedCount = selectedTasks.filter(task => task.completed).length;
  const activeCount = selectedCount - completedCount;

  if (selectedCount === 0) return null;

  const handleBulkComplete = () => {
    if (activeCount === 0) return;
    onBulkComplete(selectedTasks.filter(task => !task.completed).map(task => task.Id));
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCount} selected task${selectedCount !== 1 ? 's' : ''}?`)) {
      onBulkDelete(selectedTasks.map(task => task.Id));
    }
  };

  const handlePriorityUpdate = () => {
    if (!selectedPriority) return;
    onBulkPriorityUpdate(selectedTasks.map(task => task.Id), selectedPriority);
    setSelectedPriority("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4 mb-4"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={allSelected ? onClearSelection : onSelectAll}
                className="text-primary-600 hover:text-primary-700"
              >
                <ApperIcon name={allSelected ? "Square" : "CheckSquare"} className="w-4 h-4" />
                {allSelected ? "Deselect All" : "Select All"}
              </Button>
              <span className="text-sm text-gray-600">
                {selectedCount} of {totalTasks} selected
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeCount > 0 && (
              <Button
                onClick={handleBulkComplete}
                variant="outline"
                size="sm"
                className="bg-success/10 text-success hover:bg-success hover:text-white border-success"
              >
                <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
                Complete {activeCount}
              </Button>
            )}

            {completedCount > 0 && (
              <Button
                onClick={() => onBulkDelete(selectedTasks.filter(task => task.completed).map(task => task.Id))}
                variant="outline"
                size="sm"
                className="bg-warning/10 text-warning hover:bg-warning hover:text-white border-warning"
              >
                <ApperIcon name="Archive" className="w-4 h-4 mr-1" />
                Delete Completed ({completedCount})
              </Button>
            )}

            <div className="flex items-center gap-1">
              <Select
                value={selectedPriority}
                onChange={setSelectedPriority}
                className="w-32 h-8 text-xs"
                placeholder="Priority..."
              >
                <option value="">Set Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
              <Button
                onClick={handlePriorityUpdate}
                disabled={!selectedPriority}
                variant="outline"
                size="sm"
                className="bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ApperIcon name="Flag" className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleBulkDelete}
              variant="outline"
              size="sm"
              className="bg-error/10 text-error hover:bg-error hover:text-white border-error"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />
              Delete All
            </Button>

            <Button
              onClick={onClearSelection}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulkToolbar;