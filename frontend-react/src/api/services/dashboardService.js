import axiosInstance from '../axiosConfig';

const dashboardService = {
  // GET /api/dashboard/my-analyses
  getMyAnalyses: async () => {
    const response = await axiosInstance.get('/api/dashboard/my-analyses');
    return response.data;
  },

  // GET /api/dashboard/all-resumes
  getAllResumes: async () => {
    const response = await axiosInstance.get('/api/dashboard/all-resumes');
    return response.data;
  },
};

export default dashboardService;
