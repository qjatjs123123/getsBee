import React from 'react';
import { Card } from 'primereact/card';
import defaultThumbnail from '../../assets/defaultThumbnail.png';
import { formatDate } from '../util/util';
import { RelatedPostItem } from '../../api/RecommendAPI'; // 경로는 실제 파일 위치에 맞게 조정해야 합니다

interface RecommendItemProps {
  data: RelatedPostItem;
}

const RecommendItem: React.FC<RecommendItemProps> = ({ data }) => {
  const formattedCreatedAt = formatDate(data.post.createdAt);

  const header = (
    <div className="w-full h-48 overflow-hidden rounded-t-lg">
      <img alt="Card" src={data.post.thumbnail || defaultThumbnail} className="w-full h-full object-cover" />
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
      <Card
        title={data.post.title}
        subTitle={`${data.member.memberName}/${data.directory.directoryName}`}
        footer={footer}
        header={header}
        className="w-full max-w-sm"
      />
    </div>
  );
};

export default RecommendItem;
