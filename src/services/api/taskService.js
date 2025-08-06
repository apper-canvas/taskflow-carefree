import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = this.loadFromLocalStorage() || [...tasksData];
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem("taskflow-tasks");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return null;
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem("taskflow-tasks", JSON.stringify(this.tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.tasks]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.find(t => t.Id === parseInt(id));
        if (task) {
          resolve({...task});
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = Math.max(...this.tasks.map(t => t.Id), 0) + 1;
        const newTask = {
          Id: newId,
          ...taskData,
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null
        };
        this.tasks.push(newTask);
        this.saveToLocalStorage();
        resolve({...newTask});
      }, 300);
    });
  }

  async update(id, taskData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          this.tasks[index] = {
            ...this.tasks[index],
            ...taskData
          };
          this.saveToLocalStorage();
          resolve({...this.tasks[index]});
        } else {
          reject(new Error("Task not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          this.tasks.splice(index, 1);
          this.saveToLocalStorage();
          resolve(true);
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  }

  async toggleComplete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.find(t => t.Id === parseInt(id));
        if (task) {
          task.completed = !task.completed;
          task.completedAt = task.completed ? new Date().toISOString() : null;
          this.saveToLocalStorage();
          resolve({...task});
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  }
async getByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.tasks.filter(t => t.category === category);
        resolve([...filtered]);
      }, 200);
    });
  }

  async search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.tasks.filter(t => 
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...filtered]);
      }, 250);
    });
  }

  // Bulk operations
  async bulkComplete(taskIds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const completedTasks = [];
          taskIds.forEach(id => {
            const task = this.tasks.find(t => t.Id === parseInt(id));
            if (task && !task.completed) {
              task.completed = true;
              task.completedAt = new Date().toISOString();
              completedTasks.push({...task});
            }
          });
          this.saveToLocalStorage();
          resolve(completedTasks);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }

  async bulkDelete(taskIds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const deletedCount = taskIds.length;
          taskIds.forEach(id => {
            const index = this.tasks.findIndex(t => t.Id === parseInt(id));
            if (index !== -1) {
              this.tasks.splice(index, 1);
            }
          });
          this.saveToLocalStorage();
          resolve({ deletedCount });
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }

  async bulkUpdatePriority(taskIds, priority) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedTasks = [];
          taskIds.forEach(id => {
            const task = this.tasks.find(t => t.Id === parseInt(id));
            if (task) {
              task.priority = priority;
              updatedTasks.push({...task});
            }
          });
          this.saveToLocalStorage();
          resolve(updatedTasks);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }
}

export default new TaskService();