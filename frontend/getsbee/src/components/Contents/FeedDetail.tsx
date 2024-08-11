import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import HighlightItem from './HighlightItem';
import { FeedDetailItem } from '../../api/FeedDetailAPI';

interface FeedDetailProps {
  detail: FeedDetailItem;
}

const FeedDetail: React.FC<FeedDetailProps> = React.memo(({ detail }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="mt-5 ml-3 mb-3 bg-white rounded-[12px]"
      style={{ boxShadow: 'none', width: '600px', height: 'auto' }}
    >
      <div className="p-0 mt-4 ml-4 mr-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/myhive/${detail.memberEmail.split('@')[0]}`}>
              <Avatar image={detail.memberImage} size="large" shape="circle" />
            </Link>
            <div className="ml-2 flex flex-col justify-center">
              <Link to={`/myhive/${detail.memberEmail.split('@')[0]}/${detail.directoryId}`}>
                <h2 className="text-lg font-bold">
                  {detail.memberEmail.split('@')[0]} / {detail.directoryName}
                </h2>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-5 mr-2">
            <div className="flex items-center gap-1">
              <i className="pi pi-heart" style={{ fontSize: '1.2rem', color: '#8F8F8F' }} />
              <span className="mb-1" style={{ color: '#8F8F8F' }}>
                {detail.likeCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <i className="pi pi-eye" style={{ fontSize: '1.2rem', color: '#8F8F8F' }} />
              <span className="mb-1" style={{ color: '#8F8F8F' }}>
                {detail.viewCount}
              </span>
            </div>
          </div>
        </div>
        <div className="p-0">
          <p className="mt-2 ml-4" style={{ color: '#72736A' }}>
            {detail.highlights.length} Highlights & Notes
          </p>
          {detail.highlights.slice(0, isExpanded ? detail.highlights.length : 1).map((highlight) => {
            return <HighlightItem key={highlight.highlightId} text={highlight.content} color={highlight.color} />;
          })}
          <div className="mt-2 mb-2 mr-2 text-right">
            <Button
              label={isExpanded ? 'Show less' : 'Show more'}
              onClick={toggleExpand}
              className="p-button-text"
              style={{ color: '#72736A', fontWeight: 'semibold' }}
            />
          </div>
        </div>
        <Divider className="mt-1 my-4 border-gray-300 mb-0" style={{ borderBottomWidth: '1px' }} />
        <div className="p-0">
          <div className="flex items-center gap-2">
            <p className="mt-4 mb-0 ml-4 text-[22px]">Notes:</p>
          </div>
          <div className="mt-0 ml-4 mb-5">
            <p>{detail.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FeedDetail;
