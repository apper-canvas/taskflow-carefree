import { toast } from "react-toastify";

class CategoryService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'category_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "taskCount_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(category => ({
        Id: category.Id,
        Name: category.Name || '',
        color_c: category.color_c || '#6366f1',
        taskCount_c: category.taskCount_c || 0
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
      } else {
        console.error("Error fetching categories:", error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "taskCount_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      const category = response.data;
      return {
        Id: category.Id,
        Name: category.Name || '',
        color_c: category.color_c || '#6366f1',
        taskCount_c: category.taskCount_c || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching category with ID ${id}:`, error.message);
      }
      return null;
    }
  }

  async create(categoryData) {
    try {
      const params = {
        records: [
          {
            Name: categoryData.Name || '',
            color_c: categoryData.color_c || '#6366f1',
            taskCount_c: 0
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const category = successfulRecords[0].data;
          return {
            Id: category.Id,
            Name: category.Name || '',
            color_c: category.color_c || '#6366f1',
            taskCount_c: category.taskCount_c || 0
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
      } else {
        console.error("Error creating category:", error.message);
      }
      return null;
    }
  }

  async update(id, categoryData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: categoryData.Name || '',
            color_c: categoryData.color_c || '#6366f1',
            taskCount_c: categoryData.taskCount_c !== undefined ? categoryData.taskCount_c : 0
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update categories ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const category = successfulUpdates[0].data;
          return {
            Id: category.Id,
            Name: category.Name || '',
            color_c: category.color_c || '#6366f1',
            taskCount_c: category.taskCount_c || 0
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
      } else {
        console.error("Error updating category:", error.message);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete Categories ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length === 1;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error("Error deleting category:", error.message);
      }
      return false;
    }
  }

  async updateTaskCount(categoryName, count) {
    try {
      // First find the category by name
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "taskCount_c" } }
        ],
        where: [
          {
            FieldName: "Name",
            Operator: "EqualTo",
            Values: [categoryName]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success || !response.data || response.data.length === 0) {
        return;
      }

      const category = response.data[0];
      
      // Update the task count
      const updateParams = {
        records: [
          {
            Id: category.Id,
            taskCount_c: count
          }
        ]
      };

      await this.apperClient.updateRecord(this.tableName, updateParams);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task count:", error?.response?.data?.message);
      } else {
        console.error("Error updating task count:", error.message);
      }
    }
  }
}

export default new CategoryService();