import React from 'react';
import './Feed.css';

interface HighlightProps {
  text: string;
  color: string;
}

const Highlight: React.FC<HighlightProps> = ({ text, color }) => {
  return (
    <p className="mt-1 m-0 pl-4 relative text-with-bar" style={{ '--bar-color': color } as React.CSSProperties}>
      {text}
    </p>
  );
};

export default Highlight;
