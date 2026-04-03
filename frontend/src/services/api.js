import axios from 'axios';

// Axios instance with Base URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const fetchProducts = async (params) => {
    try {
        // params mein page, limit, category, sort, search sab pass honge
        const response = await API.get('/products', { params });
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};