import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import copy from 'clipboard-copy';
import copy from 'clipboard-copy';
import { fetchFoodsId } from '../fetch/fetchSearchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInProgress, pegarLocalStorage,
  removeLocalStorage, saveLocalStorage } from '../fetch/localStorageFunc';

function FoodInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const [mealId] = useState(id);
  const [mealInProgress, setMealInProgress] = useState({});
  const [validIngredients, setValidIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [foodFavorite, setFoodFavorite] = useState();
  const [LinkCopied, setLinkCopied] = useState(false);

  const createIngredientsList = (obj) => {
    const vinte = 20;
    const newArray = [];
    console.log(obj);
    for (let count = 1; count <= vinte; count += 1) {
      if (obj[`strIngredient${count}`]) {
        newArray.push({
          ingrediente: obj[`strIngredient${count}`],
          checked: false,
        });
      }
    }
    return newArray;
  };

  const favoritaReceita = (/* { target: { checked } } */) => {
    setFavorite(!favorite);
    if (!favorite) {
      saveLocalStorage(foodFavorite);
    }
    if (favorite) {
      removeLocalStorage(id);
    }
  };

  const isChecked = (ide) => {
    const isFavorite = pegarLocalStorage();
    if (isFavorite) {
      setFavorite(isFavorite.some((elemento) => elemento.id === ide));
    }
  };

  const compartilhar = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), Number('1000'));
  };

  const toggleIgredient = ({ target: { name } }) => {
    // console.log(checked);
    const arrayAtt = validIngredients.map((ingredient) => {
      if (ingredient.ingrediente === name) {
        ingredient.checked = !ingredient.checked;
      }
      return ingredient;
    });

    setValidIngredients(arrayAtt);
    localStorageInProgress(arrayAtt, id, pathname);
    // setCheck(target.name ? target.checked : target.checked);
  };

  const ischeckBox = (ide, foods) => {
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localInProgress && !localInProgress.cocktails && localInProgress.meals[ide]) {
      setValidIngredients(localInProgress.meals[ide]);
    } else {
      setValidIngredients(createIngredientsList(...foods));
      // localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {} }));
    }
  };

  useEffect(() => {
    const saveMealInProgress = async () => {
      const { meals } = await fetchFoodsId(mealId);
      console.log(meals);
      setMealInProgress(...meals);
      // createIngredientsList(...meals);
      ischeckBox(id, meals);
      setFoodFavorite(meals);
    };
    saveMealInProgress();
  }, []);

  useEffect(() => {
    isChecked(id);
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
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
                name="favorite"
                id="favorite"
                onClick={ favoritaReceita }
                data-testid="favorite-btn"
              />
            </label>
            { LinkCopied && <span>Link copied!</span>}
            <input
              data-testid="share-btn"
              type="image"
              onClick={ compartilhar }
              src={ shareIcon }
              alt={ shareIcon }
            />
            <div data-testid="recipe-category">
              {mealInProgress.strCategory}
            </div>
            <div data-testid="-ingredient-step">
              Ingredients Steps
              <div className="ingredientsList">
                {validIngredients && validIngredients.map((ingredient, idx) => (
                  <label
                    key={ ingredient.ingrediente }
                    htmlFor={ ingredient.ingrediente }
                    className={ ingredient.checked ? 'isChecked' : 'notChecked' }
                  >
                    <input
                      onChange={ (e) => toggleIgredient(e) }
                      checked={ ingredient.checked }
                      type="checkbox"
                      name={ ingredient.ingrediente }
                      id={ ingredient.ingrediente }
                      data-testid={ `${idx}-ingredient-step` }
                    />
                    {ingredient.ingrediente}
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
