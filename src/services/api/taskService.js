import { toast } from "react-toastify";

class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "category_c" } }
        ],
        orderBy: [
          { fieldName: "CreatedOn", sorttype: "DESC" }
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

      return response.data.map(task => ({
        Id: task.Id,
        Name: task.Name || '',
        title_c: task.title_c || '',
        description_c: task.description_c || '',
        priority_c: task.priority_c || 'medium',
        dueDate_c: task.dueDate_c || '',
        completed_c: task.completed_c || false,
        createdAt_c: task.createdAt_c || '',
        completedAt_c: task.completedAt_c || null,
        category_c: task.category_c?.Name || task.category_c || ''
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "category_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      const task = response.data;
      return {
        Id: task.Id,
        Name: task.Name || '',
        title_c: task.title_c || '',
        description_c: task.description_c || '',
        priority_c: task.priority_c || 'medium',
        dueDate_c: task.dueDate_c || '',
        completed_c: task.completed_c || false,
        createdAt_c: task.createdAt_c || '',
        completedAt_c: task.completedAt_c || null,
        category_c: task.category_c?.Name || task.category_c || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      return null;
    }
  }

  async create(taskData) {
    try {
      const params = {
        records: [
          {
            Name: taskData.title_c || taskData.Name || '',
            title_c: taskData.title_c || '',
            description_c: taskData.description_c || '',
            priority_c: taskData.priority_c || 'medium',
            dueDate_c: taskData.dueDate_c || '',
            completed_c: false,
            createdAt_c: new Date().toISOString(),
            completedAt_c: null,
            category_c: taskData.category_c || ''
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
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const task = successfulRecords[0].data;
          return {
            Id: task.Id,
            Name: task.Name || '',
            title_c: task.title_c || '',
            description_c: task.description_c || '',
            priority_c: task.priority_c || 'medium',
            dueDate_c: task.dueDate_c || '',
            completed_c: task.completed_c || false,
            createdAt_c: task.createdAt_c || '',
            completedAt_c: task.completedAt_c || null,
            category_c: task.category_c?.Name || task.category_c || ''
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
      }
      return null;
    }
  }

  async update(id, taskData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: taskData.title_c || taskData.Name || '',
            title_c: taskData.title_c || '',
            description_c: taskData.description_c || '',
            priority_c: taskData.priority_c || 'medium',
            dueDate_c: taskData.dueDate_c || '',
            completed_c: taskData.completed_c !== undefined ? taskData.completed_c : false,
            completedAt_c: taskData.completedAt_c || null,
            category_c: taskData.category_c || ''
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
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const task = successfulUpdates[0].data;
          return {
            Id: task.Id,
            Name: task.Name || '',
            title_c: task.title_c || '',
            description_c: task.description_c || '',
            priority_c: task.priority_c || 'medium',
            dueDate_c: task.dueDate_c || '',
            completed_c: task.completed_c || false,
            createdAt_c: task.createdAt_c || '',
            completedAt_c: task.completedAt_c || null,
            category_c: task.category_c?.Name || task.category_c || ''
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
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
          console.error(`Failed to delete Tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length === 1;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
      return false;
    }
  }

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error("Task not found");
      }

      const newCompleted = !currentTask.completed_c;
      const updateData = {
        completed_c: newCompleted,
        completedAt_c: newCompleted ? new Date().toISOString() : null
      };

      return await this.update(id, updateData);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
      } else {
        console.error("Error toggling task completion:", error.message);
      }
      return null;
    }
  }

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "category_c" } }
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(task => ({
        Id: task.Id,
        Name: task.Name || '',
        title_c: task.title_c || '',
        description_c: task.description_c || '',
        priority_c: task.priority_c || 'medium',
        dueDate_c: task.dueDate_c || '',
        completed_c: task.completed_c || false,
        createdAt_c: task.createdAt_c || '',
        completedAt_c: task.completedAt_c || null,
        category_c: task.category_c?.Name || task.category_c || ''
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
      }
      return [];
    }
  }

  async search(query) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "category_c" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title_c",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "description_c",
                    operator: "Contains", 
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(task => ({
        Id: task.Id,
        Name: task.Name || '',
        title_c: task.title_c || '',
        description_c: task.description_c || '',
        priority_c: task.priority_c || 'medium',
        dueDate_c: task.dueDate_c || '',
        completed_c: task.completed_c || false,
        createdAt_c: task.createdAt_c || '',
        completedAt_c: task.completedAt_c || null,
        category_c: task.category_c?.Name || task.category_c || ''
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error searching tasks:", error.message);
      }
      return [];
    }
  }

  async bulkComplete(taskIds) {
    try {
      const records = taskIds.map(id => ({
        Id: parseInt(id),
        completed_c: true,
        completedAt_c: new Date().toISOString()
      }));

      const params = { records };
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to complete tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.map(result => ({
          Id: result.data.Id,
          Name: result.data.Name || '',
          title_c: result.data.title_c || '',
          description_c: result.data.description_c || '',
          priority_c: result.data.priority_c || 'medium',
          dueDate_c: result.data.dueDate_c || '',
          completed_c: result.data.completed_c || false,
          createdAt_c: result.data.createdAt_c || '',
          completedAt_c: result.data.completedAt_c || null,
          category_c: result.data.category_c?.Name || result.data.category_c || ''
        }));
      }
      return [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk completing tasks:", error?.response?.data?.message);
      } else {
        console.error("Error bulk completing tasks:", error.message);
      }
      return [];
    }
  }

  async bulkDelete(taskIds) {
    try {
      const params = {
        RecordIds: taskIds.map(id => parseInt(id))
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return { deletedCount: 0 };
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete Tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return { deletedCount: successfulDeletions.length };
      }
      return { deletedCount: 0 };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting tasks:", error?.response?.data?.message);
      } else {
        console.error("Error bulk deleting tasks:", error.message);
      }
      return { deletedCount: 0 };
    }
  }

  async bulkUpdatePriority(taskIds, priority) {
    try {
      const records = taskIds.map(id => ({
        Id: parseInt(id),
        priority_c: priority
      }));

      const params = { records };
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update task priorities ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.map(result => ({
          Id: result.data.Id,
          Name: result.data.Name || '',
          title_c: result.data.title_c || '',
          description_c: result.data.description_c || '',
          priority_c: result.data.priority_c || 'medium',
          dueDate_c: result.data.dueDate_c || '',
          completed_c: result.data.completed_c || false,
          createdAt_c: result.data.createdAt_c || '',
          completedAt_c: result.data.completedAt_c || null,
          category_c: result.data.category_c?.Name || result.data.category_c || ''
        }));
      }
      return [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk updating task priorities:", error?.response?.data?.message);
      } else {
        console.error("Error bulk updating task priorities:", error.message);
      }
      return [];
    }
  }
}

export default new TaskService();