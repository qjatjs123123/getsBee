import axios from './axiosConfig';

export interface Comment {
  commentId: number;
  content: string;
  memberId: number;
  memberName: string;
  createdAt: string;
  isMyComment: boolean;
}

export interface Highlight {
  highlightId: number;
  content: string;
  color: string;
  startIndex: string;
  startOffset: number;
  lastIndex: string;
  lastOffset: number;
  type: string;
}

export interface FeedDetailItem {
  postId: number;
  title: string;
  url: string;
  note: string;
  thumbnailUrl: string;
  isPublic: boolean;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  memberEmail: string;
  memberImage: string;
  directoryId: number;
  directoryName: string;
  comments: Comment[];
  highlights: Highlight[];
  isLike: boolean;
  isBookmark: boolean;
  isMyPost: boolean;
}

export const fetchPosts = async (url: string, cursor: number | null, size: number) => {
  try {
    const response = await axios.post('/posts', {
      url,
      cursor,
      size,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
