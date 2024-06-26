import React from 'react';
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();
  
  console.log('Current path:', location.pathname);
  
  return (
    <div>
      Current Path: {location.pathname}
    </div>
  );
}

export default CurrentPath;
