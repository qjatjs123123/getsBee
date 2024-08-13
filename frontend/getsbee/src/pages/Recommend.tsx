import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/UserInfoAPI';
import { getRecommendPosts, RelatedPostItem } from '../api/RecommendAPI';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import NoUserInfo from '../components/Recommend/NoUserInfo';
import RecommendItem from '../components/Recommend/RecommendItem';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Recommend = () => {
  const [isRegisted, setIsRegisted] = useState<boolean | null>(null);
  const [recommendItems, setRecommendItems] = useState<RelatedPostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfoAndPosts = async () => {
      try {
        const userInfo = await getUserInfo();
        const isUserRegistered = userInfo.data.data.birthYear !== null && userInfo.data.data.category.length > 0;
        setIsRegisted(isUserRegistered);

        if (isUserRegistered) {
          setIsLoading(true);
          const response = await getRecommendPosts();
          setTimeout(() => {
            setRecommendItems(response.data.content);
            setIsLoading(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsRegisted(false);
      }
    };

    fetchUserInfoAndPosts();
  }, []);

  if (isRegisted === null) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center">
        <div className="w-[80%]">
          <Tab />
          {isRegisted ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-3 justify-items-center mt-4">
                {recommendItems.map((item) => (
                  <RecommendItem key={item.post.postId} data={item} />
                ))}
              </div>
            )
          ) : (
            <NoUserInfo />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
