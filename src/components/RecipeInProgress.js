import React from 'react';
import { useLocation } from 'react-router-dom';

function RecipeInProgress() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      hey
    </div>
  );
}

export default RecipeInProgress;
