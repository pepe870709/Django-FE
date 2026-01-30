import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
  withCredentials: true,
  
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = 'GH';
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => 
    {
      return response},
  (error) => {
    if (error.response.status === 400) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
    }
    if (error.response.status === 409) {
      // Handle unauthorized access, e.g., redirect to login
      return error.response;
    }
    return Promise.reject(error);
  }
);

export default api;

const api2 = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api2.interceptors.request.use((config) => {
  const token = 'GH';
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api2.interceptors.response.use(
  (response) => 
    {
      return response},
  (error) => {
    if (error.response.status === 400) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
    }
    if (error.response.status === 409) {
      // Handle unauthorized access, e.g., redirect to login
      return error.response;
    }
    return Promise.reject(error);
  }
);

export { api2 };
