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
}

export interface Directory {
  directoryId: number;
  directoryName: string;
}

export interface Highlight {
  highlightColors: string[];
  highlightNumber: number;
  firstHighlightColor: string | null;
  firstHighlightContent: string | null;
}

export interface Info {
  isLikedByCurrentUser: boolean;
  isBookmarkedByCurrentUser: boolean;
  relatedFeedNumber: number | null;
}

export interface FeedItem {
  post: Post;
  member: Member;
  directory: Directory;
  highlight: Highlight;
  info: Info;
}

export const fetchPosts = async (cursor: number | null, size: number) => {
  const response = await axios.get('/posts', {
    params: {
      following: true,
      cursor,
      size,
    },
  });
  console.log(response.data);
  return response.data;
};

export const HotPosts = async () => {
  const response = await axios.get('/posts/hot');
  return response.data;
};
