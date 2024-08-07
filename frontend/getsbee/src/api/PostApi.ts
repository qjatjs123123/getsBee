import axios from './axiosConfig';

export const getPostsByDirectory = async (directoryId: number, cursor?: number, size: number = 20) => {
  const response = await axios.get('/posts', {
    params: {
      directoryId,
      cursor,
      size,
    },
  });
  return response.data.data;
};

export const getPostsByMember = async (memberId: number, cursor?: number, size: number = 20) => {
  const response = await axios.get('/posts', {
    params: {
      memberId,
      cursor,
      size,
    },
  });
  return response.data.data;
};
