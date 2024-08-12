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

export const getPostsByDirectory = async (directoryId: number, cursor?: number, size: number = 20) => {
  const response = await axios.get('/posts', {
    params: {
      directoryId,
      cursor,
      size,
    },
  });
  return response.data.data;
};

export const getPostsByMember = async (memberId: number, cursor?: number, size: number = 20) => {
  const response = await axios.get('/posts', {
    params: {
      memberId,
      cursor,
      size,
    },
  });
  return response.data.data;
};

export const getPostsBySearch = async (query: string, cursor?: number, size: number = 20) => {
  const response = await axios.get('/posts', {
    params: {
      query,
      cursor,
      size,
    },
  });
  return response.data.data;
};

export const getRelatedPosts = async (postId: number, size: number): Promise<RelatedPostsResponse> => {
  const response = await axios.get<RelatedPostsResponse>(`/recommends/posts/${postId}?size=${size}`);
  return response.data;
};
