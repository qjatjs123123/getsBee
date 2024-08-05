import React, { useState, useEffect } from 'react';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';

const Tab: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items = [
    { label: 'Following', url: '/' },
    {
      label: 'For you',
      url: '/recommend',
    },
  ];

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/recommend') {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, []);

  const onTabChange = (e: TabMenuTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="card">
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={onTabChange} className="bg-white" />
    </div>
  );
};

export default Tab;
