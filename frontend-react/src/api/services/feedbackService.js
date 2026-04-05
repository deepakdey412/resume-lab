import axiosInstance from '../axiosConfig';

const feedbackService = {
  // POST /api/feedback
  submitFeedback: async (name, email, message) => {
    const response = await axiosInstance.post('/api/feedback', {
      name,
      email,
      message,
    });
    return response.data;
  },
};

export default feedbackService;
