import axios from './axiosConfig';

export interface Post {
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

export interface Member {
  memberId: number;
  memberName: string;
  memberPicture: string;
  memberEmail: string;
}

export interface Directory {
  directoryId: number;
  directoryName: string;
}

export interface Highlight {
  highlightColors: string[];
  highlightNumber: number;
}

export interface RelatedPostItem {
  post: Post;
  member: Member;
  directory: Directory;
  highlight: Highlight;
}

export interface Pageable {
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
}

export interface RelatedPostsData {
  content: RelatedPostItem[];
  pageable: Pageable;
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

export interface RelatedPostsResponse {
  status: number;
  message: string;
  isSuccess: boolean;
  data: RelatedPostsData;
  timestamp: string;
}

export const getRelatedPosts = async (postId: number, size: number): Promise<RelatedPostsResponse> => {
  const response = await axios.get<RelatedPostsResponse>(`/recommends/posts/${postId}?size=${size}`);
  return response.data;
};

export const getRecommendPosts = async (): Promise<RelatedPostsResponse> => {
  const response = await axios.get<RelatedPostsResponse>('/recommends?size=99');
  return response.data;
};
