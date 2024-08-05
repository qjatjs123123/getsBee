import React, { useState, useEffect } from 'react';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchTab: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('query') || '';

  const items = [
    { label: 'Post', url: `/search/post?query=${searchQuery}` },
    { label: 'Directory', url: `/search/directory?query=${searchQuery}` },
    { label: 'URL', url: `/search/url?query=${searchQuery}` },
  ];

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/search/url') {
      setActiveIndex(2);
    } else if (path === '/search/directory') {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, [location.pathname]);

  const onTabChange = (e: TabMenuTabChangeEvent) => {
    setActiveIndex(e.index);
    setLoading(true);
    setTimeout(() => {
      navigate(items[e.index].url); // URL 변경 시 쿼리 파라미터 유지
      setLoading(false);
    }, 300); // 0.3초 지연
  };

  return (
    <div className="card">
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={onTabChange} className="bg-white" />
      {loading && <div />}
    </div>
  );
};

export default SearchTab;
