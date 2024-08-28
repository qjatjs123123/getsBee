import { atom, selectorFamily, useRecoilCallback } from 'recoil';
import { getFollowingMemberList, deleteFollow, createFollow, getFollowerMemberList } from '../api/FollowingListApi';

interface Directory {
  directoryId: number;
  directoryName: string;
}

interface Member {
  memberId: number;
  memberEmail: string;
  picture: string;
}

interface follow {
  followId: number;
}

interface FollowingData {
  dircetor: Directory;
  member: Member;
  follow: follow;
}

interface FollowListData {
  data: FollowingData[];
}

export const followingListState = atom<FollowListData[]>({
  key: 'followingListState',
  default: [],
});

export const getFollowingMemberListState = selectorFamily<FollowListData, { memberId: number }>({
  key: 'getFollowingMemberListState',
  get:
    ({ memberId }) =>
    async () => {
      const response = await getFollowingMemberList(memberId);
      return response; // API 응답 반환
    },
});

export const getFollowerMemberListState = selectorFamily<FollowListData, { memberId: number }>({
  key: 'getFollowerMemberListState',
  get:
    ({ memberId }) =>
    async () => {
      const response = await getFollowerMemberList(memberId);
      return response; // API 응답 반환
    },
});

export const useDeleteFollow = () => {
  return useRecoilCallback(({ reset }) => async (followId: number) => {
    await deleteFollow(followId);
    reset(followingListState);
  });
};

export const useCreateFollow = () => {
  return useRecoilCallback(({ reset }) => async (directoryId: number) => {
    await createFollow(directoryId);
    reset(followingListState);
  });
};
