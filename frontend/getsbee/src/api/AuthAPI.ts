import axios from './axiosConfig';

export const logoutAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    if (!accessToken || !refreshToken) {
      console.warn('Tokens not found in local storage');
    } else {
      const response = await axios.post('/auth/logout', {
        accessToken,
        refreshToken,
      });

      if (response.status === 200) {
        console.log('Logged out successfully');
      } else {
        console.warn('Unexpected response from server during logout');
      }
    }
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    // Always clear local data and reset user state
    clearAuthData();
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('block');
};

export async function postRefreshToken() {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const response = await axios.post('/auth/reissue', {
    accessToken,
    refreshToken,
  });
  console.log(response);
  return response;
}
