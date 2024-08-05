import React from 'react';
import Header from '../components/Common/Header';
import SearchTab from '../components/Common/SearchTab';
import FollowingItem from '../components/Common/FollowingItem';
import '../index.css';

const SearchDirectory: React.FC = () => {
  const followItems = Array.from({ length: 7 }, (_, index) => <FollowingItem key={index} />);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[88%] flex flex-col">
          <SearchTab />
          <div className="mt-5 p-5">
            <div className="grid gap-x-0 gap-y-14 grid-cols-3 justify-items-center">{followItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDirectory;
