import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchDrinksId } from '../fetch/fetchSearchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInProgress, pegarLocalStorage,
  removeLocalStorage, saveLocalStorage } from '../fetch/localStorageFunc';

function DrinkInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const [drinkId] = useState(id);
  const [LinkCopied, setLinkCopied] = useState(false);

  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [drinkFavorite, setDrinkFavorite] = useState();
  const [favorite, setFavorite] = useState(false);
  const [validIngredients, setValidIngredients] = useState([]);
  // const [ingredientsChecked, setIngredientsChecked] = useState([]);
  // const [ingredientsUnChecked, setIngredientsUnChecked] = useState([]);
  // const [check, setCheck] = useState(false);

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
      saveLocalStorage(drinkFavorite);
    }
    if (favorite) {
      removeLocalStorage(id);
    }
  };

  const compartilhar = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), Number('1000'));
  };

  const isChecked = (ide) => {
    const isFavorite = pegarLocalStorage();
    if (isFavorite) {
      setFavorite(isFavorite.some((elemento) => elemento.id === ide));
    }
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
    console.log(arrayAtt);
    localStorageInProgress(arrayAtt, id, pathname);
    // setCheck(target.name ? target.checked : target.checked);
  };

  const ischeckBox = (ide, drinks) => {
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localInProgress && !localInProgress.meals && localInProgress.cocktails[ide]) {
      setValidIngredients(localInProgress.cocktails[ide]);
    } else {
      console.log('no else');
      setValidIngredients(createIngredientsList(...drinks));
      // localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {} }));
    }
  };

  useEffect(() => {
    const saveDrinkInProgress = async () => {
      const { drinks } = await fetchDrinksId(drinkId);
      setDrinkInProgress(...drinks);
      setDrinkFavorite(drinks);
      // createIngredientsList(...drinks);
      ischeckBox(id, drinks);
      console.log(drinks);
    };
    saveDrinkInProgress();
  }, []);

  useEffect(() => {
    isChecked(id);
    // ischeckBox(id);
    // setDrinkFavorite(drinks);
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
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
                name="favorite"
                id="favorite"
                onClick={ favoritaReceita }
                data-testid="favorite-btn"
              />
            </label>
            <input
              data-testid="share-btn"
              type="image"
              onClick={ compartilhar }
              src={ shareIcon }
              alt={ shareIcon }
            />
            { LinkCopied && <span>Link copied!</span>}
            <div data-testid="recipe-category">
              {drinkInProgress.strAlcoholic}
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

export default DrinkInProgress;
