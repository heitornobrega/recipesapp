import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import copy from 'clipboard-copy';
import { fetchFoodsId } from '../fetch/fetchSearchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodInProgress() {
  const { id } = useParams();
  const [mealId] = useState(id);
  const [mealInProgress, setMealInProgress] = useState({});
  const [validIngredients, setValidIngredients] = useState([]);

  const createIngredientsList = (obj) => {
    const objKeys = Object.keys(obj);
    const objValues = Object.values(obj);
    const ingredients = objKeys.reduce((acc, element, idx) => {
      if (
        element.includes('strIngredient')
        && objValues[idx] !== null
        && objValues[idx] !== '') {
        acc = [...acc, objValues[idx]];
      }
      return acc;
    }, []);
    setValidIngredients(ingredients);
  };

  useEffect(() => {
    const saveMealInProgress = async () => {
      const { meals } = await fetchFoodsId(mealId);
      console.log(meals);
      setMealInProgress(...meals);
      createIngredientsList(...meals);
    };
    saveMealInProgress();
  }, []);

  console.log(validIngredients);
  return (
    <div>
      {mealInProgress
        && (
          <div>
            <img
              src={ mealInProgress.strMealThumb }
              alt="mealsThumb"
              className="recipiesImg"
              data-testid="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { mealInProgress.strMeal }
            </h1>
            <label htmlFor="favorite">
              <input
                type="image"
                src={ whiteHeartIcon }
                alt="favorite"
                name="favorite"
                id="favorite"
                // onClick={ favoritaReceita }
                data-testid="favorite-btn"
              />
            </label>
            <input
              data-testid="share-btn"
              type="image"
              // onClick={ compartilhar }
              src={ shareIcon }
              alt={ shareIcon }
            />
            <div data-testid="recipe-category">
              {mealInProgress.strCategory}
            </div>
            <div data-testid="-ingredient-step">
              Ingredients Steps
              <div className="ingredientsList">
                {validIngredients.map((ingredient, idx) => (
                  <label key={ ingredient } id={ ingredient } htmlFor={ ingredient }>
                    <input
                      type="checkbox"
                      name={ ingredient }
                      data-testid={ `${idx}-ingredient-step` }
                    />
                    {ingredient}
                  </label>
                ))}
              </div>
            </div>
            <div data-testid="instructions">
              instrucoes
            </div>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finish Recipe
            </button>
          </div>
        )}
    </div>
  );
}

export default FoodInProgress;
