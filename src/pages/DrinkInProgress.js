import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const { pathname } = location;
  const [drinkId] = useState(id);
  const [LinkCopied, setLinkCopied] = useState(false);

  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [drinkFavorite, setDrinkFavorite] = useState();
  const [favorite, setFavorite] = useState(false);
  const [validIngredients, setValidIngredients] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const createIngredientsList = (obj) => {
    const vinte = 20;
    const newArray = [];
    for (let count = 1; count <= vinte; count += 1) {
      if (obj[`strIngredient${count}`]) {
        newArray.push({
          ingrediente: obj[`strIngredient${count}`],
          checked: false,
          quantidade: obj[`strMeasure${count}`] || '',
        });
      }
    }
    return newArray;
  };

  const favoritaReceita = () => {
    setFavorite(!favorite);
    if (!favorite) {
      saveLocalStorage(drinkFavorite);
      console.log(drinkFavorite);
    }
    if (favorite) {
      removeLocalStorage(id);
    }
  };

  const compartilhar = () => {
    copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), Number('1000'));
  };

  const verificaBotaoFinish = (ide) => {
    const localInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')).cocktails;

    const receitaPronta = localInProgress[ide]?.every((e) => e.checked === true);

    if (receitaPronta) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const isChecked = (ide) => {
    const isFavorite = pegarLocalStorage();
    if (isFavorite) {
      setFavorite(isFavorite.some((elemento) => elemento.id === ide));
    }
  };

  const toggleIgredient = ({ target: { name } }) => {
    const arrayAtt = validIngredients.map((ingredient) => {
      if (ingredient.ingrediente === name) {
        ingredient.checked = !ingredient.checked;
      }
      return ingredient;
    });

    setValidIngredients(arrayAtt);
    localStorageInProgress(arrayAtt, id, pathname);
    verificaBotaoFinish(id);
  };

  const ischeckBox = (ide, drinks) => {
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localInProgress && localInProgress.cocktails) {
      if (localInProgress.cocktails[ide].length > 0) {
        setValidIngredients(localInProgress.cocktails[ide]);
        verificaBotaoFinish(ide);
      } else {
        setValidIngredients(createIngredientsList(...drinks));
      }
    } else {
      setValidIngredients(createIngredientsList(...drinks));
    }
  };

  useEffect(() => {
    const saveDrinkInProgress = async () => {
      const { drinks } = await fetchDrinksId(drinkId);
      setDrinkInProgress(...drinks);
      setDrinkFavorite(drinks);
      ischeckBox(id, drinks);
    };
    saveDrinkInProgress();
  }, []);

  useEffect(() => {
    isChecked(id);
  }, []);
  //
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
                alt={ favorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
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
            <div>
              Ingredients Steps
              <ol className="ingredientsList">
                {validIngredients && validIngredients.map((ingredient, idx) => (
                  <li key={ ingredient.ingrediente }>
                    <label
                      htmlFor={ ingredient.ingrediente }
                      className={ ingredient.checked ? 'isChecked' : 'notChecked' }
                      data-testid={ `${idx}-ingredient-step` }
                    >
                      <input
                        onChange={ (e) => toggleIgredient(e) }
                        checked={ ingredient.checked }
                        type="checkbox"
                        name={ ingredient.ingrediente }
                        id={ ingredient.ingrediente }

                      />
                      {`${ingredient.ingrediente} ${ingredient.quantidade}`}
                    </label>
                  </li>
                ))}
              </ol>
            </div>
            <div data-testid="instructions">
              instrucoes
            </div>
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ disabled }
              onClick={ () => { history.push('/done-recipes'); } }
            >
              Finish Recipe
            </button>
          </div>
        )}
    </div>
  );
}

export default DrinkInProgress;
