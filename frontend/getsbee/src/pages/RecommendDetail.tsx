import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { getPostDetailState } from '../recoil/PostDetailState';

import Header from '../components/Common/Header';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';

const RecommendDetail = () => {
  const { postId } = useParams<{ postId: string }>();

  const posts = Array.from({ length: 10 }, (_, index) => <Post key={index} />);

  const postDetailLoadable = useRecoilValueLoadable(getPostDetailState(Number(postId)));

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden mt-4">
        <div className="flex justify-center pl-10 items-start w-2/3 overflow-y-auto scrollbar-hide">
          <div className="transform scale-[120%] mt-[100px]">
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
        <div className="flex border-l border-gray-300 flex-col w-1/3 overflow-y-auto scrollbar-hide relative">
          <div className="pl-5">
            <p className="text-[#72736A] font-bold">관련 포스트 추천</p>
            {/* {posts.map((post) => (
              <div className="mt-2">{post}</div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendDetail;
