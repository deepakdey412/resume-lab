import axiosInstance from '../axiosConfig';

const jdAnalysisService = {
  // POST /api/jd-analysis/analyze/{resumeId}
  analyzeWithJD: async (resumeId, jobDescription) => {
    const response = await axiosInstance.post(
      `/api/jd-analysis/analyze/${resumeId}`,
      jobDescription,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
    return response.data;
  },
};

export default jdAnalysisService;
