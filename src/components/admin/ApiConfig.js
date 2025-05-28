import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080",
});


// Tự động thêm token vào mọi request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;