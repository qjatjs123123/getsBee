import axios from './axiosConfig';

export async function getUserInfo() {
  const response = await axios.get('/members');
  console.log(response);
  return response;
}

export const patchUserInfo = async (data: { birthYear: number | null; category: string[] }) => {
  try {
    const response = await axios.patch('/members', data);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};
