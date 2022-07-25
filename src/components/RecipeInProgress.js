import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDrinksId, fetchFoodsId } from '../fetch/fetchSearchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInProgress, pegarLocalStorage,
  removeLocalStorage, saveLocalStorage } from '../fetch/localStorageFunc';

function RecipeInProgress({ location, id, mealsECocktails }) {
  const history = useHistory();
  const [mealOrDrinkInProgress, setMealOrDrinkInProgress] = useState({});
  const [validIngredients, setValidIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [foodorDrinkFavorite, setFoodorDrinkFavorite] = useState();
  const [LinkCopied, setLinkCopied] = useState(false);
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
      saveLocalStorage(foodorDrinkFavorite);
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
    copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), Number('1000'));
  };

  const verificaBotaoFinish = (ide) => {
    const localInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[mealsECocktails];

    const receitaPronta = localInProgress[ide]?.every((e) => e.checked === true);

    if (receitaPronta) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
    localStorageInProgress(arrayAtt, id, location.pathname);
    verificaBotaoFinish(id);
  };

  const ischeckBox = (ide, foods) => {
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localInProgress && localInProgress[mealsECocktails]) {
      if (localInProgress[mealsECocktails][ide].length > 0) {
        setValidIngredients(localInProgress[mealsECocktails][ide]);
        verificaBotaoFinish(ide);
      } else {
        setValidIngredients(createIngredientsList(...foods));
      }
    } else {
      setValidIngredients(createIngredientsList(...foods));
    }
  };

  useEffect(() => {
    const saveDrinkInProgress = async () => {
      const { drinks } = await fetchDrinksId(id);
      setMealOrDrinkInProgress(...drinks);
      setFoodorDrinkFavorite(drinks);
      ischeckBox(id, drinks);
    };

    const saveMealInProgress = async () => {
      const { meals } = await fetchFoodsId(id);
      setMealOrDrinkInProgress(...meals);
      ischeckBox(id, meals);
      setFoodorDrinkFavorite(meals);
    };

    if (mealsECocktails === 'meals') {
      saveMealInProgress();
    }
    if (mealsECocktails === 'cocktails') {
      saveDrinkInProgress();
    }
  }, []);

  useEffect(() => {
    isChecked(id);
  }, []);
  const saveDoneRecipe = () => {
    const seilaData = new Date();
    const obj = {
      id: mealOrDrinkInProgress.idMeal || mealOrDrinkInProgress.idDrink,
      name: mealOrDrinkInProgress.strMeal || mealOrDrinkInProgress.strDrink,
      type: mealOrDrinkInProgress.strMeal ? 'food' : 'drink',
      category: mealOrDrinkInProgress.strCategory,
      tags: mealOrDrinkInProgress.strTags ? mealOrDrinkInProgress.strTags.split(',') : [],
      image: mealOrDrinkInProgress.strMealThumb
        || mealOrDrinkInProgress.strDrinkThumb,
      nationality: mealOrDrinkInProgress.strArea || '',
      alcoholicOrNot: mealOrDrinkInProgress.strAlcoholic || '',
      // eslint-disable-next-line max-len
      doneDate: `${seilaData.getDate()}/${seilaData.getMonth()}/${seilaData.getFullYear()}`,
    };
    if (localStorage.getItem('doneRecipes')) {
      const receitaDaAnaMaria = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...receitaDaAnaMaria, obj]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([obj]));
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      {mealOrDrinkInProgress
        && (
          <div>
            <div className="recipeContainerImg">
              <img
                src={ mealOrDrinkInProgress.strMealThumb }
                alt="mealsThumb"
                className="recipiesImg imgMenor"
                data-testid="recipe-photo"
              />
            </div>
            <div className="containerTitulo">
              <div>
                <h1
                  data-testid="recipe-title"
                >
                  { mealOrDrinkInProgress.strMeal || mealOrDrinkInProgress.strDrink }
                </h1>
              </div>
              <div>
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
              </div>
            </div>
            <span data-testid="recipe-category" className="DetailCategory">
              {mealOrDrinkInProgress.strCategory || mealOrDrinkInProgress.strAlcoholic}
            </span>
            <div className="instrucoes">
              <h3>Ingredients</h3>
              <ul className="ingredientsList">
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
                      {` ${ingredient.ingrediente} ${ingredient.quantidade}`}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div data-testid="instructions" className="instrucoes intrucoesMargin">
              <h3>Instruções</h3>
              <p>{mealOrDrinkInProgress.strInstructions}</p>
            </div>
            <button
              className="bntStartRecipe finishBtn"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ disabled }
              onClick={ () => saveDoneRecipe() }
            >
              Finish Recipe
            </button>
          </div>
        )}
    </div>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  mealsECocktails: PropTypes.string.isRequired,
};

export default RecipeInProgress;
