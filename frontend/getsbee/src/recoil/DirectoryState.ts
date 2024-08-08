// src/recoil/directoryState.ts
import { atom, selector } from 'recoil';
// import { selectorFamily } from 'recoil';
import { getDirectories } from '../api/DirectoryApi';

export interface Directory {
  directoryId: number;
  name: string;
  depth: number;
  prevDirectoryId: number | null;
  nextDirectoryId: number | null;
  parentDirectoryId: number;
  memberId: number;
  children: Directory[];
}

export const directoryState = atom<Directory[]>({
  key: 'directoryState',
  default: [],
});

export const getDirectoryState = selector({
  key: 'getDirectoryState',
  get: async () => {
    const memberId = 2; // 여기에 실제 사용자 ID를 설정
    const data = await getDirectories(memberId);
    return data;
  },
});

// export const getDirectoryState = selectorFamily<Directory[], number>({
//   key: 'getDirectoryState',
//   get: (memberId) => async () => {
//     const data = await getDirectories(memberId);
//     return data;
//   },
// });
