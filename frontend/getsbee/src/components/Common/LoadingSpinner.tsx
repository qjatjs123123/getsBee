import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/userState';

const LoadingSpinner = () => {
  const user = useRecoilValue(userState);
  // const color = 'FFC60A';

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col items-center justify-center">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-yellow-400" /> */}
        <PropagateLoader color="#FFC60A" size={20} aria-label="Loading Spinner" data-testid="loader" />
        <p className="mt-16 text-2xl text-gray-600">
          {user?.email.split('@')[0]}님에 맞는 추천 포스트를 찾고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
