import axios from 'axios';

const API_URL = 'http://localhost:8081/inventory';

export const getAllItems = () => axios.get(`${API_URL}/items`);
export const getItemById = (id) => axios.get(`${API_URL}/items/${id}`);
export const createItem = (item) => axios.post(`${API_URL}/additems`, item);
export const updateItem = (id, itemDetails) => axios.put(`${API_URL}/items/${id}`, itemDetails);
export const deleteItem = (id) => axios.delete(`${API_URL}/items/${id}`);
export const deleteAllItems = () => axios.delete(`${API_URL}/items`);
