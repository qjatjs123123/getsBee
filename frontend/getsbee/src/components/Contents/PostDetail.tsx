import React, { useEffect, useState, KeyboardEvent } from 'react';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { InputTextarea } from 'primereact/inputtextarea';
import { useRecoilValueLoadable, useSetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import DirSelection from '../Directory/DirSelection';
import HighlightItem from './HighlightItem';
import PostUpdate from './PostUpdate';
import publicIcon from '../../assets/publicIcon.png';
import privateIcon from '../../assets/privateIcon.png';
import { createComment, deleteComment } from '../../api/CommentApi';
import {
  getPostDetailState,
  postDetailState,
  useDeletePost,
  useToggleLike,
  useToggleBookmark,
  Post,
  Highlight as HighlightType,
  Comment as CommentType,
} from '../../recoil/PostDetailState';
import { formatDate } from '../util/util';

interface PostDetailProps {
  postId: number;
  onDelete: () => void;
  onStartEditing: () => void;
  onStopEditing: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onDelete, onStartEditing, onStopEditing }) => {
  const postDetailLoadable = useRecoilValueLoadable(getPostDetailState(postId));
  const setPostDetail = useSetRecoilState(postDetailState);
  const refreshPostDetail = useRecoilRefresher_UNSTABLE(getPostDetailState(postId)); // 상태 리프레시 함수
  const [value, setValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const deletePost = useDeletePost();
  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  useEffect(() => {
    if (postDetailLoadable.state === 'hasValue') {
      setPostDetail(postDetailLoadable.contents);
    }
  }, [postDetailLoadable, setPostDetail]);

  const handleLikeToggle = async () => {
    if (!postDetail) return;

    // Optimistic update
    setPostDetail((prevPost) => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        isLike: !prevPost.isLike,
        likeCount: prevPost.isLike ? prevPost.likeCount - 1 : prevPost.likeCount + 1,
      };
    });

    try {
      // Server synchronization
      await toggleLike(postId);
      // Refresh post detail to ensure consistency with server
      refreshPostDetail();
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // Revert optimistic update on error
      setPostDetail((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          isLike: !prevPost.isLike,
          likeCount: prevPost.isLike ? prevPost.likeCount - 1 : prevPost.likeCount + 1,
        };
      });
      // Optionally, show an error message to the user
    }
  };

  const handleBookmarkToggle = async () => {
    if (!postDetail) return;

    // Optimistic update
    setPostDetail((prevPost) => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        isBookmark: !prevPost.isBookmark,
        bookmarkCount: prevPost.isBookmark ? prevPost.bookmarkCount - 1 : prevPost.bookmarkCount + 1,
      };
    });

    try {
      // Server synchronization
      await toggleBookmark(postId);
      // Refresh post detail to ensure consistency with server
      refreshPostDetail();
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      // Revert optimistic update on error
      setPostDetail((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          isBookmark: !prevPost.isBookmark,
          bookmarkCount: prevPost.isBookmark ? prevPost.bookmarkCount - 1 : prevPost.bookmarkCount + 1,
        };
      });
      // Optionally, show an error message to the user
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      setPostDetail(null);
      onDelete();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const confirmDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this post?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: handleDelete,
    });
  };

  const handleUpdateSave = (updatedPost: Post) => {
    setPostDetail(updatedPost);
    setIsEditing(false);
    onStopEditing();
  };

  const handleCancel = () => {
    setIsEditing(false);
    onStopEditing();
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsEditing(true);
      onStartEditing();
    }
  };

  const handleDeleteKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      confirmDelete();
    }
  };

  const postDetail = postDetailLoadable.state === 'hasValue' ? postDetailLoadable.contents.data : null;

  const handleCommentSubmit = async () => {
    if (value.trim()) {
      try {
        const newComment = await createComment(postId, value);
        refreshPostDetail(); // 포스트 데이터 리프레시 호출
        setValue('');
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      refreshPostDetail(); // 포스트 데이터 리프레시 호출
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (!postDetail) {
    return <div>No post details available</div>;
  }

  const publicClass = postDetail.isPublic ? 'bg-[#DBEAFE] text-[#3B559C]' : 'bg-red-200 text-red-800';
  const publicText = postDetail.isPublic ? 'Public' : 'Private';
  const iconSrc = postDetail.isPublic ? publicIcon : privateIcon;

  if (isEditing) {
    return <PostUpdate post={postDetail} onSave={handleUpdateSave} onCancel={handleCancel} />;
  }

  return (
    <div className="mb-4" style={{ width: '500px', height: 'auto' }}>
      <ConfirmDialog />
      <div className="flex justify-between mt-3">
        {postDetail.isMyPost && (
          <div className="flex items-center">
            <span className={`flex items-center text-[12px] font-semibold px-2 py-1 rounded-full ${publicClass}`}>
              <img className="flex w-[20px] h-[20px] mr-1" src={iconSrc} alt="statusIcon" />
              {publicText}
            </span>
          </div>
        )}
        <div className="flex items-center">
          {postDetail.isMyPost && (
            <DirSelection
              selectedDirectoryId={postDetail.directoryId?.toString() || ''}
              readOnly={!isEditing}
              onChange={(value) => setPostDetail({ ...postDetail, directoryId: parseInt(value, 10) })}
            />
          )}
        </div>
      </div>
      <div className="flex mt-3">
        <Avatar image={postDetail.memberImage} size="large" shape="circle" className="w-[60px] h-[60px] mt-1" />
        <div className="ml-4 flex-1">
          <p className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {postDetail.directoryName}
          </p>
          <h2 className="text-[18px] font-bold mr-1">{postDetail.title}</h2>
          <a
            href={postDetail.url}
            className="text-[12px] font-semibold hover:underline block"
            style={{ color: '#8D8D8D' }}
          >
            {postDetail.url}
          </a>
          <div className="flex justify-end text-[12px] font-semibold mt-3" style={{ color: '#8D8D8D' }}>
            <div className="flex items-center mr-4">
              <i className="pi pi-heart mr-1" />
              <span>{postDetail.likeCount}</span>
            </div>
            <div className="flex items-center">
              <i className="pi pi-eye mr-1" />
              <span className="mr-3">{postDetail.viewCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <Divider className="mt-1 mb-2 border-gray-300" style={{ borderBottomWidth: '1px' }} />
      </div>
      <div className="flex justify-between items-center mt-3 ml-3">
        <h2 className="text-[18px] font-bold">Highlights</h2>
        <div className="flex">
          {postDetail.isMyPost && (
            <span className="flex">
              <i
                className="pi pi-trash mr-2 text-[#8D8D8D] hover:text-[#07294D] cursor-pointer"
                title="Delete"
                onClick={confirmDelete}
                onKeyPress={handleDeleteKeyPress}
                role="button"
                tabIndex={0}
                aria-label="Delete"
              />
              <i
                className="pi pi-file-edit mr-2 text-[#8D8D8D] hover:text-[#07294D] cursor-pointer"
                title="Edit"
                onClick={() => {
                  setIsEditing(true);
                  onStartEditing();
                }}
                onKeyPress={handleKeyPress}
                tabIndex={0}
                role="button"
                aria-label="Edit"
              />
            </span>
          )}
          <i
            className={`pi ${postDetail.isLike ? 'pi-heart-fill text-red-500' : 'pi-heart text-[#8D8D8D]'} mr-2 hover:text-red-500 cursor-pointer`}
            title={postDetail.isLike ? 'Unlike' : 'Like'}
            onClick={handleLikeToggle}
          />
          <i
            className={`pi ${postDetail.isBookmark ? 'pi-bookmark-fill text-yellow-500' : 'pi-bookmark text-[#8D8D8D]'} mr-2 hover:text-yellow-500 cursor-pointer`}
            title={postDetail.isBookmark ? 'Remove Bookmark' : 'Bookmark'}
            onClick={handleBookmarkToggle}
          />
          <i className="pi pi-share-alt mr-2 text-[#8D8D8D] hover:text-[#07294D] cursor-pointer" title="Share" />
        </div>
      </div>
      <div className="mt-4 ml-6">
        {postDetail.highlights &&
          postDetail.highlights.map((highlight: HighlightType) => (
            <div key={highlight.highlightId} className="mb-4">
              <HighlightItem text={highlight.content} color={highlight.color} />
            </div>
          ))}
      </div>
      <div className="flex mt-3 ml-3">
        <h2 className="text-[18px] font-bold">Notes</h2>
      </div>
      <div className="mt-1 ml-6">{postDetail.note}</div>
      <div className="flex mt-3 ml-3">
        <h2 className="text-[18px] font-bold">Comments</h2>
      </div>
      <div className="relative mt-3 ml-3">
        <div className="card flex flex-col">
          <InputTextarea
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
            rows={2}
            style={{ width: '100%' }}
          />
          <button
            type="button"
            onClick={handleCommentSubmit}
            style={{
              backgroundColor: '#1E88E5',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '50px',
              height: '30px',
              fontSize: '14px',
              marginTop: '10px',
              alignSelf: 'flex-end',
            }}
          >
            등록
          </button>
        </div>
      </div>
      <div className="ml-3">
        {postDetail.comments &&
          postDetail.comments.map((comment: CommentType) => (
            <div key={comment.commentId} className="flex items-start mt-3">
              <img src={comment.avatar} alt="avatar" className="w-[30px] h-[30px] rounded-full mt-2" />
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <p className="font-semibold mr-2">{comment.memberName}</p>
                  <p className="text-[12px]" style={{ color: '#8D8D8D' }}>
                    {formatDate(comment.createdAt)}
                  </p>
                  {postDetail.isMyPost && comment.isMyComment && (
                    <i
                      className="pi pi-trash ml-auto text-[#8D8D8D] hover:text-[#07294D] cursor-pointer"
                      onClick={() => handleCommentDelete(comment.commentId)}
                      title="Delete Comment"
                    />
                  )}
                </div>
                <p className="text-[14px]">{comment.content}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostDetail;
