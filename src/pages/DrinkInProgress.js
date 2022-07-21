import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinksId } from '../fetch/fetchSearchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkInProgress() {
  const { id } = useParams();
  const [drinkId] = useState(id);
  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [validIngredients, setValidIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [ingredientsUnChecked, setIngredientsUnChecked] = useState([]);
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

  const toggleIgredient = ({ target: { value } }) => {
    if (ingredientsChecked.includes(value)) {
      const ingredientCheckedIndex = ingredientsChecked.indexOf(value);
      setIngredientsChecked(
        [
          ...ingredientsChecked.slice(ingredientCheckedIndex),
          ...ingredientsChecked
            .slice(ingredientCheckedIndex + 1, ingredientsChecked.length),
        ],
      );

      setIngredientsUnChecked([...ingredientsUnChecked, value]);
    } else {
      const ingredientUnCheckedIndex = ingredientsUnChecked.indexOf(value);
      setIngredientsUnChecked(
        [
          ...ingredientsUnChecked.slice(ingredientUnCheckedIndex),
          ...ingredientUnCheckedIndex.slice(ingredientUnCheckedIndex + 1,
            ingredientUnCheckedIndex.length),
        ],
      );
      setIngredientsChecked([...ingredientsChecked, value]);
    }
  };

  useEffect(() => {
    const saveDrinkInProgress = async () => {
      const { drinks } = await fetchDrinksId(drinkId);
      setDrinkInProgress(...drinks);
      createIngredientsList(...drinks);
    };
    saveDrinkInProgress();
  }, []);

  return (
    <div>
      {drinkInProgress
        && (
          <div>
            <img
              src={ drinkInProgress.strDrinkThumb }
              alt="mealsThumb"
              className="recipiesImg"
              data-testid="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { drinkInProgress.strDrink }
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
              {drinkInProgress.strAlcoholic}
            </div>
            <div data-testid="-ingredient-step">
              Ingredients Steps
              <div className="ingredientsList">
                {validIngredients.map((ingredient, idx) => (
                  <label key={ ingredient } id={ ingredient } htmlFor={ ingredient }>
                    <input
                      className={ isChecked }
                      onChange={ (e) => toggleIgredient(e) }
                      value={ ingredient }
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

export default DrinkInProgress;
