import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import Highlight from './Highlight';

export default function FeedDetail() {
  const user = {
    avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    name: 'Hong BoemSun / IT / Cloud',
    date: 'Released on 08/08, 2024',
    like: '1.2k',
    viewer: '3.7k',
  };

  const headerTemplate = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar image={user.avatar} size="large" shape="circle" />
          <div className="ml-2 flex flex-col justify-center">
            <h2 className="text-lg font-bold">{user.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5 mr-2">
          <div className="flex items-center gap-1">
            <i className="pi pi-heart" style={{ fontSize: '1.2rem', color: '#8F8F8F' }} />
            <span className="mb-1" style={{ color: '#8F8F8F' }}>
              {user.like}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <i className="pi pi-eye" style={{ fontSize: '1.2rem', color: '#8F8F8F' }} />
            <span className="mb-1" style={{ color: '#8F8F8F' }}>
              {user.viewer}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const footerTemplate = () => {
    return (
      <div className="p-0">
        <div className="flex items-center gap-2">
          <p className="mt-4 mb-0 ml-4 text-[22px]">Notes:</p>
        </div>
        <div className="mt-0 ml-4 mb-5">
          <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages ...</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="mt-5 ml-3 mb-3 bg-white rounded-[12px]"
      style={{ boxShadow: 'none', width: '600px', height: 'auto' }}
    >
      <div className="p-0 mt-4 ml-4 mr-2">
        {headerTemplate()}
        <div className="p-0">
          <p className="mt-2 ml-4" style={{ color: '#72736A' }}>
            4 Highlights & Notes
          </p>
          <Highlight
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            color="#000000"
          />
          <p className="mt-2 mb-2 mr-2 font-semibold text-right " style={{ color: '#72736A' }}>
            Show more
          </p>
        </div>
        <Divider className="mt-1 my-4 border-gray-300 mb-0" style={{ borderBottomWidth: '1px' }} />
        {footerTemplate()}
      </div>
    </div>
  );
}
