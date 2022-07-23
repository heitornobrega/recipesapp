import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';

function DetailsFood() {
  const { id } = useParams();
  const location = useLocation();
  return (
    <RecipeDetails id={ id } location={ location } />
  );
}

export default DetailsFood;
