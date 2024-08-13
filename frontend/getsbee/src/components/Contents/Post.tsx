import React, { useState } from 'react';
import { formatDate } from '../util/util';
import defaultThumbnail from '../../assets/defaultThumbnail.png';

interface PostProps {
  title: string;
  url: string;
  thumbnail?: string;
  viewCount: number;
  directoryName: string;
  createdAt: string;
  highlightColors: string[];
  highlightNumber: number;
}

const Post: React.FC<PostProps> = ({
  title,
  url,
  thumbnail,
  viewCount,
  directoryName,
  createdAt,
  highlightColors,
  highlightNumber,
}) => {
  const formattedCreatedAt = formatDate(createdAt);

  const [thumbnailError, setThumbnailError] = useState(false);

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const thumbnailSrc = thumbnail && !thumbnailError ? thumbnail : defaultThumbnail;

  return (
    <div className="border border-gray-300 rounded-[12px]" style={{ width: '400px', height: '150px' }}>
      <div className="flex">
        <div className="mt-3 ml-3 w-[100px] h-[100px] overflow-hidden rounded-lg border border-gray-300">
          <img
            src={thumbnailSrc}
            alt={thumbnail ? '썸네일' : '기본 이미지'}
            className="w-full h-full object-cover object-center"
            onError={handleThumbnailError}
          />
        </div>
        <div className="ml-2.5 flex-1 w-[250px]">
          <h2
            className="text-[18px] font-bold mt-2 leading-tight mr-1"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
            }}
          >
            {title}
          </h2>
          <a
            href={url}
            className="text-[12px] font-semibold hover:underline block mr-2"
            style={{
              color: '#8D8D8D',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {url}
          </a>
          <p className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {directoryName}
          </p>
          <p className="text-[12px] font-semibold" style={{ color: '#8D8D8D' }}>
            조회수 {viewCount}
          </p>
        </div>
      </div>
      <div className="flex ml-3 justify-between mt-1 px-4">
        <p className="text-[12px] font-semibold mt-1" style={{ color: '#8D8D8D' }}>
          {formattedCreatedAt}
        </p>
        <div className="flex">
          <div className="flex mt-1">
            {highlightColors.map((color) => (
              <span key={color} className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-[14px] font-semibold" style={{ color: '#8D8D8D' }}>
            {highlightNumber} Highlights
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
