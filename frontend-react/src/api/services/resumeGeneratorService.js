import axiosInstance from '../axiosConfig';

const resumeGeneratorService = {
  // POST /api/resume-generator/generate?download=false (preview)
  generateResumePreview: async (resumeData) => {
    const response = await axiosInstance.post(
      '/api/resume-generator/generate?download=false',
      resumeData,
      {
        responseType: 'blob',
      }
    );
    return response.data;
  },

  // POST /api/resume-generator/generate?download=true (download)
  generateResumeDownload: async (resumeData) => {
    const response = await axiosInstance.post(
      '/api/resume-generator/generate?download=true',
      resumeData,
      {
        responseType: 'blob',
      }
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${resumeData.name}_Resume.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response.data;
  },
};

export default resumeGeneratorService;
