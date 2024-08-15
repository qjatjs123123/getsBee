import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import defaultThumbnail from '../../assets/defaultThumbnail.png';
import { formatDate } from '../util/util';
import { RelatedPostItem } from '../../api/RecommendAPI';
import './RecommendItem.css';

interface RecommendItemProps {
  data: RelatedPostItem;
}

const RecommendItem: React.FC<RecommendItemProps> = ({ data }) => {
  const [imageSrc, setImageSrc] = useState(data.post.thumbnail || defaultThumbnail);
  const formattedCreatedAt = formatDate(data.post.createdAt);

  const handleImageError = () => {
    setImageSrc(defaultThumbnail);
  };

  const header = (
    <div className="w-full h-48 overflow-hidden rounded-t-lg">
      <img alt="Card" src={imageSrc} onError={handleImageError} className="w-full h-full object-cover" />
    </div>
  );

  const footer = (
    <div className="flex justify-between items-center w-full">
      <p>{formattedCreatedAt}</p>
      <div className="flex items-center gap-1">
        <i className="pi pi-heart" style={{ fontSize: '1.2rem', color: '#8F8F8F' }} />
        <span className="mb-1" style={{ color: '#8F8F8F' }}>
          {data.post.likeCount}
        </span>
      </div>
    </div>
  );

  return (
    <div className="card flex justify-content-center transform scale-90">
      <Link to={`/posts/${data.post.postId}`} className="flex items-center font-bold">
        <Card footer={footer} header={header} className="w-full max-w-sm shadow h-[360px] overflow-hidden">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem]">{data.post.title}</h2>

          <div className="flex items-center font-bold">
            <Link to={`/myhive/${data.member.memberEmail.split('@')[0]}/${data.directory.directoryId}`}>
              <p className="ml-1 text-base text-[#8D8D8D] truncate hover:underline">
                {`${data.member.memberEmail.split('@')[0]} / ${data.directory.directoryName}`}
              </p>
            </Link>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default RecommendItem;
