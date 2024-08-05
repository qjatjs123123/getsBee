import React from 'react';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import Feed from '../components/Contents/Feed';
import FeedDetail from '../components/Contents/FeedDetail';
import honeyComb from '../assets/honeyComb.png';
import '../index.css';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[88%] flex flex-col">
          <Tab />
          <div className="flex flex-grow overflow-hidden">
            <div className="w-[600px] p-4 border-r overflow-y-auto scrollbar-hide">
              <div className="mt-4">
                <Feed />
              </div>
              <div className="mt-4">
                <Feed />
              </div>
              <div className="mt-4">
                <Feed />
              </div>
              <div className="mt-4">
                <Feed />
              </div>
            </div>
            <div className="flex flex-col flex-grow p-4 items-start overflow-y-auto scrollbar-hide">
              <div className="flex items-center">
                <img src={honeyComb} alt="honeyComb" className="w-10" />
                <p className="ml-1 text-[#CC9C00] font-semibold text-[24px]">Others&apos; Highlights</p>
              </div>
              <div className="mt-4 border-b">
                <FeedDetail />
              </div>
              <div className="mt-4 border-b">
                <FeedDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
