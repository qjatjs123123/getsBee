import { atom, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { getUserInfoByEmailPrefix, getUserInfoById, getUserHiveInfoById } from '../api/UserInfoAPI';

// Recoil Persist 설정
const { persistAtom } = recoilPersist();

// 사용자 정보를 위한 인터페이스 정의
export interface UserInfo {
  memberId: number;
  email: string;
  name: string;
  picture: string;
}

export interface HiveInfo {
  following: number;
  follower: number;
  postNumber: number;
}

// 사용자 상태를 관리하는 atom
// null이면 로그인하지 않은 상태를 의미
export const userState = atom<UserInfo | null>({
  key: 'userState', // 고유한 ID (Recoil 내부에서 사용)
  default: null, // 초기 상태
  effects_UNSTABLE: [persistAtom], // Recoil Persist 효과 추가
});

// 인증 상태를 관리하는 atom
// true면 로그인 된 상태, false면 로그인되지 않은 상태
export const isAuthenticatedState = atom<boolean>({
  key: 'isAuthenticatedState',
  default: false,
  effects_UNSTABLE: [persistAtom], // Recoil Persist 효과 추가
});

export const userRouteSelector = selector({
  key: 'userRouteSelector',
  get: ({ get }) => {
    const user = get(userState);
    if (user && user.email) {
      const username = user.email.split('@')[0];
      return `/myhive/${username}`;
    }
    return null;
  },
});

export const userInfoByEmailPrefixSelector = selectorFamily<UserInfo | null, string>({
  key: 'userInfoByEmailPrefixSelector',
  get: (emailPrefix) => async () => {
    try {
      const userInfo = await getUserInfoByEmailPrefix(emailPrefix);
      return userInfo.data.data;
    } catch (error) {
      console.error('Error in selector:', error);
      return null;
    }
  },
});

export const userInfoByIdSelector = selectorFamily<UserInfo | null, number>({
  key: 'userInfoByIdSelector',
  get: (memberId) => async () => {
    try {
      const userInfo = await getUserInfoById(memberId);
      return userInfo.data.data;
    } catch (error) {
      console.error('Error in selector:', error);
      return null;
    }
  },
});

export const userHiveInfoByIdSelector = selectorFamily<HiveInfo | null, number>({
  key: 'userHiveInfoByIdSelector',
  get: (memberId) => async () => {
    try {
      const hiveInfo = await getUserHiveInfoById(memberId);
      return hiveInfo.data.data;
    } catch (error) {
      console.error('Error in selector:', error);
      return null;
    }
  },
});
