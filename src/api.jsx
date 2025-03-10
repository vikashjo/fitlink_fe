import axios from "axios";

const API_BASE_URL = "http://localhost:3000/"; // Update with backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Attaching token:", token); // Check if this logs
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token found in local storage");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;
