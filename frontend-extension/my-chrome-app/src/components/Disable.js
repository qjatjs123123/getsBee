import React from 'react';
import './Disable.css'; // 비활성화 스타일을 위한 CSS 파일

function Disable() {
  return (
    <div className="disabled-container">
      <div className="overlay">
        <p className="disabled-text">비활성화되었습니다.</p>
      </div>
    </div>
  );
}

export default Disable;
