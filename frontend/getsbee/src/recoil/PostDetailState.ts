// src/recoil/PostDetailState.ts
import { atom, selectorFamily } from 'recoil';
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
  memberImage: string;
}

export const postDetailState = atom<Post | null>({
  key: 'postDetailState',
  default: null,
});

export const getPostDetailState = selectorFamily({
  key: 'getPostDetailState',
  get: (postId: number) => async () => {
    const data = await getPostDetail(postId);
    return data;
  },
});
