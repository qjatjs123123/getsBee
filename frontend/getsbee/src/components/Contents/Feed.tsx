import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import HighlightItem from './HighlightItem';
import './Feed.css'; // 추가된 CSS 파일

import honeyCombg from '../../assets/honeyCombg.png';

export default function Feed() {
  const user = {
    avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    name: 'Hong BoemSun',
    date: 'Released on 08/08, 2024',
  };

  const headerTemplate = () => {
    return (
      <div className="flex mb-3">
        <div className="flex items-center justify-between w-[450px]">
          <div className="flex items-center">
            <Avatar image={user.avatar} size="normal" shape="circle" />
            <div className="ml-2 flex justify-center">
              <h2 className="text-sm font-bold text-gray-600">{user.name}</h2>
            </div>
          </div>
          <div className="ml-2 flex justify-end">
            <p className="mt-1 mb-1 text-xs text-gray-600 font-medium">{user.date}</p>
          </div>
        </div>
      </div>
    );
  };

  const footerTemplate = () => {
    return (
      <div className="flex items-center justify-between p-[3px]">
        <div className="flex items-center gap-2">
          <img className="custom-image" src={honeyCombg} alt="honeyComb" />
          <p className="m-0 font-bold opacity-50">100</p>
        </div>
        <div className="flex flex-wrap items-center justify-end">
          <div className="flex items-center">
            <Button icon="pi pi-bookmark" style={{ color: '#8F8F8F' }} severity="secondary" rounded text />
            <Button icon="pi pi-share-alt" style={{ color: '#8F8F8F' }} rounded text />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="mt-5 ml-3 mb-3 bg-white border border-gray-300 rounded-[12px] custom-card"
      style={{ boxShadow: 'none' }}
    >
      <div className="p-0 mt-4 ml-4 mr-2">
        {headerTemplate()}
        <div className="p-0">
          <HighlightItem
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            color="#3498db"
          />
          <div className="flex items-center gap-2 mt-3 border border-gray-300 rounded-[12px] mr-3">
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="rounded-s-[10px]" />
            <div>
              <a
                href="https://example.com"
                className="font-bold text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                빌더(Builder)패턴 - 완벽 마스터하기
              </a>
              <p className="m-0 text-[14px]" style={{ color: '#8D8D8D' }}>
                sample.com/builder
              </p>
            </div>
          </div>
        </div>
        <Divider className="my-4 border-gray-300 mb-0" style={{ borderBottomWidth: '1px' }} />
        {footerTemplate()}
      </div>
    </div>
  );
}
