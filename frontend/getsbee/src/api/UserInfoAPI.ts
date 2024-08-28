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

export const getUserInfoByEmailPrefix = async (emailPrefix: string) => {
  try {
    const response = await axios.get(`/members/search?emailPrefix=${emailPrefix}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching user info by email prefix:', error);
    throw error;
  }
};

export const getUserInfoById = async (memberId: number) => {
  try {
    if (memberId === 0) {
      return;
    }
    const response = await axios.get(`/members/${memberId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching user info by ID:', error);
    throw error;
  }
};

export const getUserHiveInfoById = async (memberId: number) => {
  try {
    if (memberId === 0) {
      return;
    }
    const response = await axios.get(`/follows/hiveInfo/members/${memberId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching user hive info by ID:', error);
    throw error;
  }
};
