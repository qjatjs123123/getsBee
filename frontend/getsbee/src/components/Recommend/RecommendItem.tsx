import React from 'react';
import { Card } from 'primereact/card';
import defaultThumbnail from '../../assets/defaultThumbnail.png';
import { formatDate } from '../util/util';

const RecommendItem = () => {
  const data = {
    post: {
      postId: 1,
      title: 'Post Title 1',
      url: 'https://example.com/post1',
      thumbnail: defaultThumbnail,
      note: 'This is a note for Post 1',
      isPublic: true,
      viewCount: 123,
      likeCount: 45,
      bookmarkCount: 10,
      createdAt: '2023-01-01T00:00:00Z',
    },
    member: {
      memberId: 123,
      memberName: 'Dayhun',
      memberPicture: 'https://s3.example.com/thumbnail1.jpg',
    },
    directory: {
      directoryId: 123,
      directoryName: 'example directory',
    },
    highlight: {
      highlightColors: ['yellow', 'green'],
      highlightNumber: 4,
      firstHighlightColor: 'yellow',
      firstHighlightContent: 'first hightlight content example',
    },
    info: {
      isLikedByCurrentUser: true,
      isBookmarkedByCurrentUser: false,
      relatedFeedNumber: 100,
    },
  };
  const formattedCreatedAt = formatDate(data.post.createdAt);

  const header = (
    <div className="w-full h-48 overflow-hidden rounded-t-lg">
      <img alt="Card" src={data.post.thumbnail} className="w-full h-full object-cover" />
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
