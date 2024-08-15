import React, { forwardRef, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import HighlightItem from './HighlightItem';
import { FeedItem } from '../../api/FeedAPI';
import './Feed.css';

import { toggleLikeAPI, toggleBookmarkAPI } from '../../api/SocialAPI';
import honeyCombg from '../../assets/honeyCombg.png';
import defaultThumbnail from '../../assets/defaultThumbnail.png';

interface FeedProps extends FeedItem {
  className: string;
  onClick: (url: string) => void;
  isSelected: boolean;
  url: string;
  onUpdateFeed: (updatedFeed: FeedItem) => void;
}

const Feed = forwardRef<HTMLDivElement, FeedProps>(
  ({ post, member, directory, highlight, info, className, onClick, isSelected, url, onUpdateFeed }, ref) => {
    const [thumbnailError, setThumbnailError] = useState(false);

    const handleThumbnailError = () => {
      setThumbnailError(true);
    };

    const handleLikeToggle = async () => {
      const updatedInfo = {
        ...info,
        isLikedByCurrentUser: !info.isLikedByCurrentUser,
      };
      const updatedPost = {
        ...post,
        likeCount: info.isLikedByCurrentUser ? post.likeCount - 1 : post.likeCount + 1,
      };
      onUpdateFeed({ post: updatedPost, member, directory, highlight, info: updatedInfo });

      try {
        await toggleLikeAPI(post.postId, info.isLikedByCurrentUser);
      } catch (error) {
        console.error('Failed to toggle like:', error);
        onUpdateFeed({ post, member, directory, highlight, info });
      }
    };

    const handleBookmarkToggle = async () => {
      const newBookmarkState = info.isBookmarkedByCurrentUser;

      try {
        await toggleBookmarkAPI(post.postId, newBookmarkState);

        const updatedInfo = {
          ...info,
          isBookmarkedByCurrentUser: !newBookmarkState,
        };
        onUpdateFeed({ post, member, directory, highlight, info: updatedInfo });
      } catch (error) {
        console.error('Failed to toggle bookmark:', error);
        // API 호출이 실패하면 상태를 업데이트하지 않습니다.
      }
    };

    const headerTemplate = () => {
      return (
        <div className="flex mb-3">
          <div className="flex items-center justify-between w-[450px]">
            <div className="flex items-center">
              <div
                onClick={() => (window.location.href = `/myhive/${member.memberEmail.split('@')[0]}`)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar className="flex" image={member.memberPicture} size="normal" shape="circle" />
              </div>

              <div
                className="hover:underline"
                onClick={() =>
                  (window.location.href = `/myhive/${member.memberEmail.split('@')[0]}/${directory.directoryId}`)
                }
                style={{ cursor: 'pointer' }}
              >
                <div className="ml-2 flex justify-center">
                  <h2 className="text-sm font-bold text-gray-600">{`${member.memberEmail.split('@')[0]} / ${directory.directoryName}`}</h2>
                </div>
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
            <p className="m-0 font-bold opacity-50">{info.relatedFeedNumber}</p>
          </div>
          <div className="flex flex-wrap items-center justify-end">
            <div className="flex items-center">
              {/* <Button
                icon={`pi ${info.isLikedByCurrentUser ? 'pi-heart-fill' : 'pi-heart'}`}
                style={{ color: info.isLikedByCurrentUser ? '#ff4136' : '#8F8F8F' }}
                onClick={handleLikeToggle}
                severity="secondary"
                rounded
                text
              /> */}
              <Button
                icon={`pi ${info.isBookmarkedByCurrentUser ? 'pi-bookmark-fill' : 'pi-bookmark'}`}
                style={{ color: info.isBookmarkedByCurrentUser ? '#CC9C00' : '#8F8F8F' }}
                onClick={handleBookmarkToggle}
                severity="secondary"
                rounded
                text
              />
            </div>
          </div>
        </div>
      );
    };

    const truncateText = (text: string, maxLength: number) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    };

    return (
      <div
        ref={ref}
        className={`mt-5 ml-3 mb-3 bg-white border rounded-[12px] custom-card ${className}`}
        style={{
          borderColor: isSelected ? '#FFC60A' : '#d1d5db',
          borderWidth: isSelected ? '3px' : '1px',
          boxShadow: isSelected ? '0 0 10px rgba(255, 198, 10, 0.5)' : 'none',
          transition: 'border-color 0.3s, border-width 0.3s, box-shadow 0.3s',
        }}
        onClick={() => {
          console.log('Clicked URL in Feed:', url);
          onClick(url);
        }}
      >
        <div className="p-0 mt-4 ml-4 mr-2">
          {headerTemplate()}
          <div className="p-0">
            {highlight.firstHighlightContent && (
              <HighlightItem
                text={highlight.firstHighlightContent}
                color={highlight.firstHighlightColor || '#FFFFFF'}
              />
            )}
            <div className="flex items-center gap-2 mt-3 border border-gray-300 rounded-[12px] mr-3">
              <div className="w-[100px] h-[100px] overflow-hidden rounded-s-[10px]">
                {post.thumbnail && !thumbnailError ? (
                  <img
                    src={post.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-full object-cover object-center"
                    onError={handleThumbnailError}
                  />
                ) : (
                  <img
                    src={defaultThumbnail}
                    alt="Default Thumbnail"
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <a
                  href={post.url}
                  className="font-bold mr-2 text-primary block whitespace-nowrap overflow-hidden text-ellipsis"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={post.title}
                >
                  {truncateText(post.title, 150)}
                </a>
                <p
                  className="m-0 text-[14px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ color: '#8D8D8D' }}
                  title={new URL(post.url).hostname}
                >
                  {truncateText(new URL(post.url).hostname, 30)}
                </p>
              </div>
            </div>
          </div>
          <Divider className="my-4 border-gray-300 mb-0" style={{ borderBottomWidth: '1px' }} />
          {footerTemplate()}
        </div>
      </div>
    );
  },
);

Feed.displayName = 'Feed';

export default Feed;
