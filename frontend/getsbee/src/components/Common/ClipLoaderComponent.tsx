import React from 'react';
import { ClipLoader } from 'react-spinners';

const ClipLoaderComponent = () => {
  return (
    <div className="mt-64">
      <ClipLoader color="#8D8D8D" size={100} aria-label="ClipLoader" data-testid="loader" />
    </div>
  );
};

export default ClipLoaderComponent;
