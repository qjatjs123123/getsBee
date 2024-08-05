import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import NoUserInfo from '../components/Recommend/NoUserInfo';
import RecommendItem from '../components/Recommend/RecommendItem';

const Recommend = () => {
  const [isRegisted] = useState<boolean>(false);
  const recommendItems = [
    { id: 1, name: 'Item 1', description: 'Description for item 1' },
    { id: 2, name: 'Item 2', description: 'Description for item 2' },
    { id: 3, name: 'Item 3', description: 'Description for item 3' },
    { id: 4, name: 'Item 4', description: 'Description for item 4' },
    { id: 5, name: 'Item 5', description: 'Description for item 5' },
    { id: 6, name: 'Item 6', description: 'Description for item 6' },
  ];

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[88%]">
          <Tab />
          {isRegisted ? (
            <div className="grid grid-cols-3 justify-items-center mt-4">
              {recommendItems.map(() => (
                <RecommendItem />
              ))}
            </div>
          ) : (
            <NoUserInfo />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
