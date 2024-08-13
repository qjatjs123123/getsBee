import React from 'react';

const BeeSpinner = () => {
  return (
    <svg
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <g transform="translate(0, 0)">
          <g transform="translate(25, 25)">
            <circle fill="#FFD700" cx="25" cy="25" r="25" />
            <polygon
              fill="#000000"
              points="25,0 20,35 25,45 30,35"
              transform="rotate(0 25 25)"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default BeeSpinner;
