import { atom, selectorFamily } from 'recoil';
import { getDirectoriesByQuery } from '../api/DirectorySearchApi';

interface Directory {
  directoryId: number;
  directoryName: string;
  postNumber: number;
}

interface Member {
  memberId: number;
  memberName: string;
  memberPicture: string;
}

interface follow {
  followCount: number;
  isFollowedByCurrentUser: boolean;
}

interface DirectoryData {
  dircetor: Directory;
  member: Member;
  follow: follow;
}

interface DirectorySearchData {
  data: any;
  content: DirectoryData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export const directorySearchState = atom<DirectorySearchData>({
  key: 'directorySearchState',
  default: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    first: true,
    last: false,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    numberOfElements: 0,
    empty: true,
  },
});

// 디렉터리 검색 상태를 관리하는 selectorFamily 정의
export const getDirectoriesByQueryState = selectorFamily<
  DirectorySearchData,
  { query: string; cursor?: number; size?: number }
>({
  key: 'getDirectoriesByQueryState',
  get:
    ({ query, cursor, size }) =>
    async () => {
      // 디렉터리 검색 API 호출
      const response = await getDirectoriesByQuery(query, cursor, size);
      return response; // API 응답 반환
    },
});
