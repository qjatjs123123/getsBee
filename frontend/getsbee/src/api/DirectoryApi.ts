import axios from './axiosConfig';

export interface DirectoryInfo {
  isFollow: boolean;
  followId: number;
  depth: number;
  directoryName: string;
  isMyDirectory: boolean;
  memberEmail: string;
  parentDirectoryId: number | null;
  parentDirectoryName: string | null;
  postCount: number;
}

export const getDirectories = async (memberId: number) => {
  if (memberId === 0) {
    return;
  }

  const response = await axios.get(`/directories`, {
    params: { memberId },
  });

  if (response.status !== 200) {
    throw new Error('Failed to get directories');
  }

  return response.data;
};

export const updateDirectories = async (memberId: number, directories: any[]) => {
  if (memberId === 0) {
    return;
  }

  try {
    const response = await axios.post(`/directories?memberId=${memberId}`, directories, {
      headers: {
        skipErrorHandling: 'true', // 인터셉터에서 400 에러를 무시하도록 설정
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to update directories');
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('updateDirectories 함수에서 400 에러가 발생했습니다:', error);
      throw error; // 필요 시 에러를 재발생 시키거나 여기서 로직 종료
    } else {
      throw error; // 그 외의 에러는 인터셉터에 맡기기 위해 그대로 던짐
    }
  }
};

export const getDirectoryInfo = async (directoryId: number) => {
  const response = await axios.get(`/directories/${directoryId}`);

  if (response.status !== 200) {
    throw new Error('Failed to get directories');
  }

  return response.data;
};
