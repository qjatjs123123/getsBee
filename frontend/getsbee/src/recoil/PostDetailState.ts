// src/recoil/PostDetailState.ts
import { atom, selector } from 'recoil';
import { getPostDetail } from '../api/PostDetailApi';

export interface Highlight {
  highlightId: number;
  content: string;
  color: string;
  startIndex: string;
  startOffset: number;
  lastIndex: number;
  lastOffset: number;
  type: string;
}

export interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;
  avatar: string;
}

export interface Post {
  postId: number;
  title: string;
  url: string;
  note: string | null;
  thumbnailUrl: string;
  isPublic: boolean;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  directoryId: number | null;
  directoryName: string | null;
  highlights: Highlight[];
  isLike: boolean;
  isBookmark: boolean;
  isMyPost: boolean;
  comments: Comment[];
  avatar: string;
}

export const postDetailState = atom<Post | null>({
  key: 'postDetailState',
  default: null,
});

export const getPostDetailState = selector({
  key: 'getPostDetailState',
  get: async () => {
    const postId = 2; // 실제 포스트 ID를 설정
    const data = await getPostDetail(postId);
    return data;
  },
});
