import axios from './axiosConfig';

export const toggleLikeAPI = async (postId: number, isLiked: boolean): Promise<void> => {
  const url = `/posts/${postId}/likes`;
  const method = isLiked ? 'DELETE' : 'POST';

  try {
    await axios({
      method: method,
      url: url,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} post: ${error.message}`);
    } else {
      throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} post`);
    }
  }
};
