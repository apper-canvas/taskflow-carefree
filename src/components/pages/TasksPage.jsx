import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import FilterTabs from "@/components/molecules/FilterTabs";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import ApperIcon from "@/components/ApperIcon";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  const updateCategoryTaskCounts = useCallback(() => {
    categories.forEach(async (category) => {
      const categoryTasks = tasks.filter(task => task.category === category.name);
      await categoryService.updateTaskCount(category.name, categoryTasks.length);
    });
  }, [tasks, categories]);

  useEffect(() => {
    updateCategoryTaskCounts();
  }, [updateCategoryTaskCounts]);

  const applyFilters = useCallback(() => {
    let filtered = [...tasks];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Filter by status
    if (activeFilter === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (activeFilter === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, selectedCategory, activeFilter, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const getTaskCounts = () => {
    const counts = {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length
    };

    const categoryCounts = {};
    categories.forEach(category => {
      categoryCounts[category.name] = tasks.filter(t => t.category === category.name).length;
    });

    return { ...counts, ...categoryCounts };
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      
      if (updatedTask.completed) {
        if (updatedTask.priority === "high") {
          toast.success("🎉 High priority task completed! Excellent work!");
        } else {
          toast.success("✅ Task completed successfully!");
        }
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", err);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ));
        toast.success("Task updated successfully!");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [...prev, newTask]);
        toast.success("New task created!");
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task");
      console.error("Error saving task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.delete(taskId);
        setTasks(prev => prev.filter(task => task.Id !== taskId));
        toast.success("Task deleted successfully");
      } catch (err) {
        toast.error("Failed to delete task");
        console.error("Error deleting task:", err);
      }
    }
  };

  const taskCounts = getTaskCounts();

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            TaskFlow
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your personal productivity companion. Organize, prioritize, and accomplish your daily tasks with ease.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            taskCounts={taskCounts}
          />
        </div>

        {/* Tasks Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search tasks by title or description..."
                />
              </div>
              <Button
                onClick={handleAddTask}
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-3 shadow-floating hover:scale-105 transition-all duration-300"
              >
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onRetry={loadTasks}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onAddTask={handleAddTask}
              categories={categories}
              emptyMessage={
                searchQuery 
                  ? "No tasks match your search" 
                  : selectedCategory 
                  ? `No tasks in ${selectedCategory}` 
                  : activeFilter === "completed" 
                  ? "No completed tasks yet" 
                  : "No tasks found"
              }
              emptyDescription={
                searchQuery 
                  ? "Try adjusting your search terms or filters" 
                  : "Start by creating your first task to get organized and productive"
              }
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full shadow-floating hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      >
        <ApperIcon name="Plus" className="w-6 h-6" />
      </motion.button>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitTask}
        task={editingTask}
        categories={categories}
      />
    </div>
  );
};

export default TasksPage;