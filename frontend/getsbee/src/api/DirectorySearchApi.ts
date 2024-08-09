import axios from './axiosConfig';

export const getDirectoriesByQuery = async (query: string, cursor?: number, size: number = 20) => {
  const response = await axios.get(`/directories/search`, {
    params: {
      query,
      cursor,
      size,
    },
  });

  return response.data;
};
