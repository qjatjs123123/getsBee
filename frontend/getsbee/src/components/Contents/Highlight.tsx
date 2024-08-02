import React from 'react';
import './Feed.css';

interface HighlightProps {
  text: string;
  color: string;
  className?: string;
}

const Highlight: React.FC<HighlightProps> = ({ text, color, className }) => {
  return (
    <p
      className={`mt-1 m-0 pl-4 relative text-with-bar ${className}`}
      style={{ '--bar-color': color } as React.CSSProperties}
    >
      {text}
    </p>
  );
};

Highlight.defaultProps = {
  className: '',
};

export default Highlight;
