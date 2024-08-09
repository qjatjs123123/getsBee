// src/recoil/directoryState.ts
import { atom, selectorFamily } from 'recoil';
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

export const getDirectoryState = selectorFamily<Directory[], number>({
  key: 'getDirectoryState',
  get: (memberId) => async () => {
    const response = await getDirectories(memberId);
    return response.data;
  },
});
