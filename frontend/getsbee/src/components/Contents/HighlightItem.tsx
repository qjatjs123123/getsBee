import React from 'react';
import './Feed.css';

interface HighlightProps {
  text: string;
  color: string;
  className?: string;
}

const HighlightItem: React.FC<HighlightProps> = ({ text, color, className }) => {
  return (
    <p
      className={`mt-1 m-0 pl-4 relative text-with-bar ${className}`}
      style={{ '--bar-color': color } as React.CSSProperties}
    >
      {text}
    </p>
  );
};

HighlightItem.defaultProps = {
  className: '',
};

export default HighlightItem;
