import axiosInstance from '../axiosConfig';

const resumeService = {
  // POST /api/resumes/upload
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/api/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // DELETE /api/resumes/{id}
  deleteResume: async (id) => {
    const response = await axiosInstance.delete(`/api/resumes/${id}`);
    return response.data;
  },
};

export default resumeService;
