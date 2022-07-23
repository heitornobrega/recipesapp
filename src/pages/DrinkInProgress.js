import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import RecipeInProgress from '../components/RecipeInProgress';

function DrinkInProgress() {
  const { id } = useParams();
  const location = useLocation();

  return (
    <RecipeInProgress id={ id } location={ location } mealsECocktails="cocktails" />

  );
}

export default DrinkInProgress;
