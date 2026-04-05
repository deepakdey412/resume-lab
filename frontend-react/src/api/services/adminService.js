import axiosInstance from '../axiosConfig';

const adminService = {
  // POST /api/admin/login
  adminLogin: async (email, password) => {
    const response = await axiosInstance.post('/api/admin/login', {
      email,
      password,
    });
    return response.data;
  },

  // GET /api/admin/dashboard
  getAdminDashboard: async () => {
    const response = await axiosInstance.get('/api/admin/dashboard');
    return response.data;
  },

  // GET /api/admin/feedback
  getAllFeedback: async () => {
    const response = await axiosInstance.get('/api/admin/feedback');
    return response.data;
  },

  // DELETE /api/admin/feedback/:feedbackId
  deleteFeedback: async (feedbackId) => {
    const response = await axiosInstance.delete(`/api/admin/feedback/${feedbackId}`);
    return response.data;
  },
};

export default adminService;
