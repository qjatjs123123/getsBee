import React from 'react';
import { useNavigate } from 'react-router-dom';
import noOptionalInfo from '../assets/noOptionalInfo.png';

const Error = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '14%' }} className="flex flex-col items-center justify-center">
      <img src={noOptionalInfo} alt="" className="w-[120px] " />
      <h1 className="font-bold text-[38px] mb-4">잘못된 접근입니다.</h1>
      <button
        onClick={goHome}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          cursor: 'pointer',
          backgroundColor: '#FFBF09',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
        className="font-bold"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Error;
