import React, { useState, useEffect } from 'react';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import geminiIcon from '../../assets/geminiIcon.png';
import Vector from '../../assets/Vector.png';

const Tab: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items = [
    { label: 'HOT', url: '/' },
    { label: 'Following', url: '/home' },
    {
      label: (
        <span style={{ position: 'relative' }}>
          Recommend
          <img
            src={Vector}
            alt="Vector"
            style={{
              width: '11px',
              height: '11px',
              position: 'absolute',
              top: '-4px',
              right: '22px',
            }}
          />
        </span>
      ),
      url: '/recommend',
    },
  ];

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/recommend') {
      setActiveIndex(2);
    } else if (path === '/home') {
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
