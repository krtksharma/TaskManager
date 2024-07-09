import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await axios.get(`${API_URL}?${queryString}`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
    }
};

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (taskId, task) => axios.put(`${API_URL}/${taskId}`, task);

export const deleteTask = (taskId) => axios.delete(`${API_URL}/${taskId}`);
