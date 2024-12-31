import React from 'react';
import './Tab.css';
import { tabItems } from "./util/constant"

const Tab = React.memo(({ setTab, tab }) => {
  const handleTabClick = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        {tabItems.map(({ name, label }) => (
          <div
            key={name}
            className={`tab ${tab === name ? 'active' : ''}`} 
            onClick={() => handleTabClick(name)} 
          >
            {label} 
          </div>
        ))}
      </div>
    </div>
  );
});

export default Tab;
