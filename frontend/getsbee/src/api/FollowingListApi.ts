import axios from './axiosConfig';

export const getFollowingMemberList = async (memberId: number) => {
  const response = await axios.get(`/follows/following/members/${memberId}`);

  return response.data;
};

export const getFollowerMemberList = async (memberId: number) => {
  const response = await axios.get(`/follows/follower/members/${memberId}`);

  return response.data;
};

export const deleteFollow = async (followId: number) => {
  const response = await axios.delete(`/follows/${followId}`);

  return response.data;
};

export const createFollow = async (directoryId: number) => {
  const response = await axios.post(`/follows/directories/${directoryId}`);

  return response.data;
};
