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

export const getPostsBySearch = async (query: string, cursor?: number, size: number = 20) => {
  try {
    const response = await axios.get('/posts', {
      params: {
        query,
        cursor,
        size,
      },
      headers: {
        skipErrorHandling: 'true', // 400 에러를 무시하도록 설정
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      // 400 에러에 대한 커스텀 처리 (여기서는 무시하고 넘어감)
      console.error('getPostsBySearch 함수에서 400 에러가 발생했습니다:', error);
      // 필요 시 추가 로직 작성 가능
      throw error; // 에러를 재발생시키지 않으면 여기서 처리가 끝납니다.
    } else {
      throw error; // 그 외의 에러는 인터셉터에 맡기기 위해 그대로 던짐
    }
  }
};

// export const getPostsBySearch = async (query: string, cursor?: number, size: number = 20) => {
//   const response = await axios.get('/posts', {
//     params: {
//       query,
//       cursor,
//       size,
//     },
//   });
//   return response.data.data;
// };
