import React, { forwardRef, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import HighlightItem from './HighlightItem';
import { FeedItem } from '../../api/FeedAPI';
import './Feed.css';

import honeyCombg from '../../assets/honeyCombg.png';
import defaultThumbnail from '../../assets/defaultThumbnail.png';

interface FeedProps extends FeedItem {
  className: string;
}

const Feed = forwardRef<HTMLDivElement, FeedProps>(({ post, member, directory, highlight, info, className }, ref) => {
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const headerTemplate = () => {
    return (
      <div className="flex mb-3">
        <div className="flex items-center justify-between w-[450px]">
          <div className="flex items-center">
            <Avatar image={member.memberPicture} size="normal" shape="circle" />
            <div className="ml-2 flex justify-center">
              <h2 className="text-sm font-bold text-gray-600">{member.memberName}</h2>
            </div>
          </div>
          <div className="ml-2 flex justify-end">
            <p className="mt-1 mb-1 text-xs text-gray-600 font-medium">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
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
          <p className="m-0 font-bold opacity-50">{post.likeCount}</p>
        </div>
        <div className="flex flex-wrap items-center justify-end">
          <div className="flex items-center">
            <Button
              icon="pi pi-bookmark"
              style={{ color: info.isBookmarkedByCurrentUser ? '#CC9C00' : '#8F8F8F' }}
              severity="secondary"
              rounded
              text
            />
            <Button icon="pi pi-share-alt" style={{ color: '#8F8F8F' }} rounded text />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`mt-5 ml-3 mb-3 bg-white border border-gray-300 rounded-[12px] custom-card ${className}`}
      style={{ boxShadow: 'none' }}
    >
      <div className="p-0 mt-4 ml-4 mr-2">
        {headerTemplate()}
        <div className="p-0">
          {highlight.firstHighlightContent && (
            <HighlightItem text={highlight.firstHighlightContent} color={highlight.firstHighlightColor || '#FFFFFF'} />
          )}
          <div className="flex items-center gap-2 mt-3 border border-gray-300 rounded-[12px] mr-3">
            <div className="w-[100px] h-[100px] overflow-hidden rounded-s-[10px]">
              {thumbnailError ? (
                <img src={defaultThumbnail} alt="Placeholder" className="w-full h-full object-cover object-center" />
              ) : (
                <img
                  src={post.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover object-center"
                  onError={handleThumbnailError}
                />
              )}
            </div>
            <div className="flex-1">
              <a href={post.url} className="font-bold text-primary" target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
              <p className="m-0 text-[14px]" style={{ color: '#8D8D8D' }}>
                {new URL(post.url).hostname}
              </p>
            </div>
          </div>
        </div>
        <Divider className="my-4 border-gray-300 mb-0" style={{ borderBottomWidth: '1px' }} />
        {footerTemplate()}
      </div>
    </div>
  );
});

Feed.displayName = 'Feed';

export default Feed;
