import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = this.loadFromLocalStorage() || [...categoriesData];
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem("taskflow-categories");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading categories from localStorage:", error);
      return null;
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem("taskflow-categories", JSON.stringify(this.categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.categories]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = this.categories.find(c => c.Id === parseInt(id));
        if (category) {
          resolve({...category});
        } else {
          reject(new Error("Category not found"));
        }
      }, 150);
    });
  }

  async create(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = Math.max(...this.categories.map(c => c.Id), 0) + 1;
        const newCategory = {
          Id: newId,
          ...categoryData,
          taskCount: 0
        };
        this.categories.push(newCategory);
        this.saveToLocalStorage();
        resolve({...newCategory});
      }, 250);
    });
  }

  async update(id, categoryData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          this.categories[index] = {
            ...this.categories[index],
            ...categoryData
          };
          this.saveToLocalStorage();
          resolve({...this.categories[index]});
        } else {
          reject(new Error("Category not found"));
        }
      }, 250);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          this.categories.splice(index, 1);
          this.saveToLocalStorage();
          resolve(true);
        } else {
          reject(new Error("Category not found"));
        }
      }, 200);
    });
  }

  async updateTaskCount(categoryName, count) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = this.categories.find(c => c.name === categoryName);
        if (category) {
          category.taskCount = count;
          this.saveToLocalStorage();
        }
        resolve();
      }, 100);
    });
  }
}

export default new CategoryService();