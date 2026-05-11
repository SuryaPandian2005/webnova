import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      // Clear auth and redirect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('builderai-auth');
        delete api.defaults.headers.common['Authorization'];
        const currentPath = window.location.pathname;
        if (!['/login', '/register', '/'].includes(currentPath)) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject({ ...error, message });
  }
);

export default api;