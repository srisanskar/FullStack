import axiosInstance from '../utils/axiosInstance';

export const fetchVideos = async () => {
  try {
    const response = await axiosInstance.get('/api/videos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};
