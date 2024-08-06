import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// Recoil Persist 설정
const { persistAtom } = recoilPersist();

// 사용자 정보를 위한 인터페이스 정의
export interface UserInfo {
  email: string;
  name: string;
  picture: string;
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
