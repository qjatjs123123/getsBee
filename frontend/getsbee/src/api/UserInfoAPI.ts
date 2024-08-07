import axios from './axiosConfig';

export async function getUserInfo() {
  const response = await axios.get('/members');
  console.log(response);
  return response;
}

export async function patchUserInfo() {
  const response = await axios.patch('/members');
  console.log(response);
  return response;
}
