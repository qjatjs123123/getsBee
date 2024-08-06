import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ENDPOINT;

const noAuthRequired = ['/auth/login', '/auth/reissue', '/auth/logout'];

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

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url && noAuthRequired.includes(config.url)) {
      return config;
    }

    const token = localStorage.getItem('accessToken');
    console.log('Current token:', token);
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { retryAttempt?: boolean };
    if (error.response?.status === 401 && !originalRequest.retryAttempt) {
      originalRequest.retryAttempt = true;

      try {
        const response = await postRefreshToken();
        if (response.status === 200) {
          console.log(response.data);

          const { accessToken, refreshToken } = response.data.data;

          if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log('New access token set:', accessToken);

            // Update the Authorization header with the new token
            originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);

            return axios(originalRequest);
          }
        }
        throw new Error('Invalid token data received');
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Perform logout or redirect to login page
        // Example: window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
