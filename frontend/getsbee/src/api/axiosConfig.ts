import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ENDPOINT;

// 인증이 필요하지 않은 엔드포인트
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

// 요청 인터셉터
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증이 필요하지 않은 엔드포인트인지 확인
    if (config.url && noAuthRequired.includes(config.url)) {
      return config;
    }

    // 그 외의 요청에는 Bearer 토큰 추가
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

// 응답 인터셉터
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

            // 원래 요청 재시도 (인터셉터가 알아서 헤더를 추가할 것임)
            return axios(originalRequest);
          }
        }
        throw new Error('Invalid token data received');
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // 로그아웃 처리나 로그인 페이지로 리디렉션 등을 여기서 수행
        // Example: window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
