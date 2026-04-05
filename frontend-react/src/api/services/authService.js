import axiosInstance from '../axiosConfig';

const authService = {
  // POST /api/auth/signup
  signup: async (fullName, email, password) => {
    const response = await axiosInstance.post('/api/auth/signup', {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  // POST /api/auth/login
  login: async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // POST /api/admin/login
  adminLogin: async (email, password) => {
    const response = await axiosInstance.post('/api/admin/login', {
      email,
      password,
    });
    return response.data;
  },

  // Logout helper
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
