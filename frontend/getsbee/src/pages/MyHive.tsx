import React from 'react';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import SubSearchBar from '../components/Common/SubSearchBar';
import DirectoryNav from '../components/Directory/DirectoryNav';
import '../index.css'; // CSS 파일을 임포트합니다.

const MyHive: React.FC = () => {
  const userName = 'HoSeok Lee'; // 예시 사용자 이름
  const directories = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'Cloud' },
  ]; // 예시 디렉토리 경로
  const postCount = 30;

  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="mt-[75px] mb-[5px]">
            <DirectoryNav userName={userName} directories={directories} postCount={postCount} />
          </div>
          <div className="mb-[33px] mr-[12px]">
            <Menu />
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className="flex flex-col items-center w-[465px] p-4 border-r overflow-y-auto scrollbar-hide">
            <SubSearchBar />
            <div className="mt-4">
              <Post />
            </div>
            <div className="mt-4">
              <Post />
            </div>
            <div className="mt-4">
              <Post />
            </div>
            <div className="mt-4">
              <Post />
            </div>
          </div>
          <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[110%] mt-8 mb-8">
            <PostDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHive;
