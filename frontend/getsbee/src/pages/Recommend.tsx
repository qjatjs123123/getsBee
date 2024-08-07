import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/UserInfoAPI';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import NoUserInfo from '../components/Recommend/NoUserInfo';
import RecommendItem from '../components/Recommend/RecommendItem';

const Recommend = () => {
  const [isRegisted, setIsRegisted] = useState<boolean>(false);
  const recommendItems = [
    { id: 1, name: 'Item 1', description: 'Description for item 1' },
    { id: 2, name: 'Item 2', description: 'Description for item 2' },
    { id: 3, name: 'Item 3', description: 'Description for item 3' },
    { id: 4, name: 'Item 4', description: 'Description for item 4' },
    { id: 5, name: 'Item 5', description: 'Description for item 5' },
    { id: 6, name: 'Item 6', description: 'Description for item 6' },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setIsRegisted(userInfo.data.data.birthYear !== null && userInfo.data.data.category.length > 0);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsRegisted(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[80%]">
          <Tab />
          {isRegisted ? (
            <div className="grid grid-cols-3 justify-items-center mt-4">
              {recommendItems.map((item) => (
                <RecommendItem key={item.id} {...item} />
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
