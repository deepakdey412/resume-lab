import axiosInstance from '../axiosConfig';

const analysisService = {
  // POST /api/analysis/resume/{resumeId}
  analyzeResume: async (resumeId) => {
    const response = await axiosInstance.post(`/api/analysis/resume/${resumeId}`);
    return response.data;
  },

  // GET /api/analysis/resume/{resumeId}/top/{topN}
  getTopMatches: async (resumeId, topN = 5) => {
    const response = await axiosInstance.get(`/api/analysis/resume/${resumeId}/top/${topN}`);
    return response.data;
  },
};

export default analysisService;
