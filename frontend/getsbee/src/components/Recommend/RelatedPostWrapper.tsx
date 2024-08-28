import React from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../Contents/Post';
import { RelatedPostItem } from '../../api/RecommendAPI';

interface RelatedPostWrapperProps {
  relatedPost: RelatedPostItem;
}

const RelatedPostWrapper: React.FC<RelatedPostWrapperProps> = ({ relatedPost }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')) {
      e.preventDefault();
      e.stopPropagation();
      window.open(target.getAttribute('href'), '_blank');
    } else {
      navigate(`/posts/${relatedPost.post.postId}`);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Post
        title={relatedPost.post.title}
        url={relatedPost.post.url}
        thumbnail={relatedPost.post.thumbnail}
        viewCount={relatedPost.post.viewCount}
        directoryName={relatedPost.directory.directoryName}
        createdAt={relatedPost.post.createdAt}
        highlightColors={relatedPost.highlight.highlightColors}
        highlightNumber={relatedPost.highlight.highlightNumber}
        memberEmail={relatedPost.member.memberEmail}
        directoryId={relatedPost.directory.directoryId}
      />
    </div>
  );
};

export default RelatedPostWrapper;
