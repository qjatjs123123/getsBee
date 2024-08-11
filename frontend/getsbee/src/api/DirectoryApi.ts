import axios from './axiosConfig';

export interface DirectoryInfo {
  follow: boolean;
  depth: number;
  directoryName: string;
  isMyDirectory: boolean;
  memberEmail: string;
  parentDirectoryId: number | null;
  parentDirectoryName: string | null;
  postCount: number;
}

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

export const getDirectoryInfo = async (directoryId: number) => {
  const response = await axios.get(`/directories/${directoryId}`);

  if (response.status !== 200) {
    throw new Error('Failed to get directories');
  }

  return response.data;
};
