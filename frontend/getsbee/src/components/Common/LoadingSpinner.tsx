import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-yellow-400" />
      <p className="mt-4 text-xl text-gray-600">추천 포스트를 찾고 있습니다.</p>
    </div>
  );
};

export default LoadingSpinner;
