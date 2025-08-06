import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskModal = ({ isOpen, onClose, onSubmit, task = null, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: categories.length > 0 ? categories[0].name : "",
        priority: "medium",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task, categories, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />
          
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {task ? "Edit Task" : "Create New Task"}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <Input
                    label="Task Title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    error={errors.title}
                    placeholder="Enter task title..."
                    className="text-base"
                  />
                  
                  <Textarea
                    label="Description (Optional)"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Add task details..."
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Category"
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      error={errors.category}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.Id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                    
                    <Select
                      label="Priority"
                      value={formData.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </Select>
                  </div>
                  
                  <Input
                    label="Due Date (Optional)"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ApperIcon name={task ? "Save" : "Plus"} className="w-4 h-4 mr-2" />
                      {task ? "Update" : "Create"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;