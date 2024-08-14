import { atom, selectorFamily } from 'recoil';
import { getPostsByDirectory, getPostsByMember, getPostsBySearch } from '../api/PostApi';

interface Post {
  postId: number;
  title: string;
  url: string;
  thumbnail: string;
  note: string;
  isPublic: boolean;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  createdAt: string;
}

interface Member {
  memberId: number;
  memberName: string;
  memberPicture: string;
  memberEmail: string;
}

interface Directory {
  directoryId: number;
  directoryName: string;
}

interface Highlight {
  highlightColors: string[];
  highlightNumber: number;
  firstHighlightColor: string | null;
  firstHighlightContent: string | null;
}

interface Info {
  isLikedByCurrentUser: boolean;
  isBookmarkedByCurrentUser: boolean;
  relatedFeedNumber: number | null;
}

interface PostData {
  post: Post;
  member: Member;
  directory: Directory;
  highlight: Highlight;
  info: Info;
}

interface PostsData {
  content: PostData[];
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

export const postState = atom<PostData[]>({
  key: 'postState',
  default: [],
});

export const getPostsByDirectoryState = selectorFamily<
  PostsData,
  { directoryId: number; cursor?: number; size?: number }
>({
  key: 'getPostsByDirectoryState',
  get:
    ({ directoryId, cursor, size }) =>
    async () => {
      const data = await getPostsByDirectory(directoryId, cursor, size);
      return data;
    },
});

export const getPostsByMemberState = selectorFamily<PostsData, { memberId: number; cursor?: number; size?: number }>({
  key: 'getPostsByMemberState',
  get:
    ({ memberId, cursor, size }) =>
    async () => {
      const data = await getPostsByMember(memberId, cursor, size);
      return data;
    },
});

export const getPostsBySearchState = selectorFamily<PostsData, { query: string; cursor?: number; size?: number }>({
  key: 'getPostsBySearchState',
  get:
    ({ query, cursor, size }) =>
    async () => {
      const data = await getPostsBySearch(query, cursor, size);
      return data;
    },
});