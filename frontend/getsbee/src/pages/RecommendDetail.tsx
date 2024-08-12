import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { getPostDetailState } from '../recoil/PostDetailState';
import { getRelatedPosts, RelatedPostItem } from '../api/PostApi';

import Header from '../components/Common/Header';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';

const RecommendDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [relatedPosts, setRelatedPosts] = useState<RelatedPostItem[]>([]);

  const postDetailLoadable = useRecoilValueLoadable(getPostDetailState(Number(postId)));

  useEffect(() => {
    if (postDetailLoadable.state === 'hasValue') {
      const postData = postDetailLoadable.contents.data;
      if (postData && postData.directoryName === 'Temporary') {
        navigate('/error');
      }
    }
  }, [postDetailLoadable.state, navigate]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await getRelatedPosts(Number(postId), 5);
        setRelatedPosts(response.data.content);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
      }
    };

    fetchRelatedPosts();
  }, [postId]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden mt-4">
        <div className="flex justify-center pl-10 items-start w-3/5 overflow-y-auto scrollbar-hide">
          <div className="transform scale-[130%] mt-[100px]">
            {postDetailLoadable.state === 'loading' && <div>Loading...</div>}
            {postDetailLoadable.state === 'hasError' && <div>Error loading post details</div>}
            {postDetailLoadable.state === 'hasValue' && (
              <PostDetail
                postId={Number(postId)}
                onDelete={() => {
                  /* Handle delete */
                }}
                onStartEditing={() => {
                  /* Handle start editing */
                }}
                onStopEditing={() => {
                  /* Handle stop editing */
                }}
              />
            )}
          </div>
        </div>
        <div className="flex border-l border-gray-300 flex-col w-2/5 overflow-y-auto scrollbar-hide relative">
          <div className="pl-5">
            <p className="text-[#72736A] font-bold">관련 포스트 추천</p>
            {relatedPosts.length > 0 ? (
              relatedPosts.map((relatedPost) => (
                <div key={relatedPost.post.postId} className="mt-2">
                  <Post
                    title={relatedPost.post.title}
                    url={relatedPost.post.url}
                    thumbnail={relatedPost.post.thumbnail}
                    viewCount={relatedPost.post.viewCount}
                    directoryName={relatedPost.directory.directoryName}
                    createdAt={relatedPost.post.createdAt}
                    highlightColors={relatedPost.highlight.highlightColors}
                    highlightNumber={relatedPost.highlight.highlightNumber}
                  />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">연관 콘텐츠가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendDetail;
