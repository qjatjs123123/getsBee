import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { logoutAPI, clearAuthData } from './AuthAPI';
import { postRefreshToken } from './AuthAPI';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ENDPOINT;

const noAuthRequired = ['/auth/login', '/auth/reissue', '/auth/logout'];

const emitLogoutEvent = () => {
  const event = new CustomEvent('logout');
  window.dispatchEvent(event);
};

const handleLogout = async () => {
  try {
    await logoutAPI();
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    clearAuthData();
    emitLogoutEvent();
  }
};

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

    // 요청 헤더에 skipErrorHandling이 설정되어 있으면 400 에러를 무시
    if (originalRequest.headers['skipErrorHandling'] && error.response?.status === 400) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.retryAttempt) {
      originalRequest.retryAttempt = true;

      try {
        const response = await postRefreshToken();
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data.data;

          if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            return axios(originalRequest);
          }
        }
        throw new Error('Invalid token data received');
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 400) {
      window.location.href = '/error';
    }

    return Promise.reject(error);
  },
);

export default axios;
