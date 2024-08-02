import React, { useState } from 'react';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';

const Tab: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items = [
    { label: 'Router Link', url: '/tabmenu' },
    {
      label: 'Programmatic',
      command: () => {
        // Add your command logic here
      },
    },
    { label: 'External', url: 'https://react.dev/' },
  ];

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
