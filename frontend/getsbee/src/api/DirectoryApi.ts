import axios from './axiosConfig';

export const getDirectories = async (memberId: number) => {
  const response = await axios.get(`/directories`, {
    params: { memberId },
  });

  if (response.status !== 200) {
    throw new Error('Failed to get directories');
  }

  return response.data;
};

export const updateDirectories = async (memberId: number, directories: any[]) => {
  const response = await axios.post(`/directories?memberId=${memberId}`, directories);

  if (response.status !== 200) {
    throw new Error('Failed to update directories');
  }

  return response.data;
};
