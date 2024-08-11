import axios from './axiosConfig';

// 댓글 생성 함수
export const createComment = async (postId: number, content: string) => {
  try {
    const response = await axios.post('/comments', {
      content,
      post_id: postId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// 댓글 삭제 함수
export const deleteComment = async (commentId: number) => {
  try {
    const response = await axios.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
