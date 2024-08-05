import React from 'react';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import NoUserInfo from '../components/Recommend/NoUserInfo';

const Recommend = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[88%]">
          <Tab />
        </div>
      </div>
      <NoUserInfo />
    </div>
  );
};

export default Recommend;
