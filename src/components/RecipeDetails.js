import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDrinkMounth, fetchDrinksId,
  fetchFoodsId, fetchMealsMounth } from '../fetch/fetchSearchRecipes';
import shareIcon from '../images/shareIcon.svg';
import { saveLocalStorage, removeLocalStorage, pegarLocalStorage,
  verifyLocalStorage } from '../fetch/localStorageFunc';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails({ id, location }) {
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);
  const [LinkCopied, setLinkCopied] = useState(false);
  const [drinkOuFoods, setDrinkOuFoods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [receitaProgress, setReceitaProgress] = useState(false);
  const [finishedRecipe, setFinishedRecipe] = useState(true);

  const recipeProgressDrink = (array, ideLocal) => {
    const lista = JSON.parse(localStorage.getItem('inProgressRecipes'))?.cocktails || {};
    if (lista[ideLocal]) {
      const receitaPronta = lista[ideLocal].every((e) => e.checked === true);
      if (receitaPronta && lista[ideLocal].length > 0) {
        setFinishedRecipe(false);
      } else { setFinishedRecipe(true); setReceitaProgress(true); }
    }
  };

  const recipeProgressFood = (array, ideLocal) => {
    const lista = JSON.parse(localStorage.getItem('inProgressRecipes'))?.meals || {};
    if (lista[ideLocal]) {
      const receitaPronta = lista[ideLocal].every((e) => e.checked === true);
      if (receitaPronta && lista[ideLocal].length > 0) {
        setFinishedRecipe(false);
      } else { setFinishedRecipe(true); setReceitaProgress(true); }
    }
  };

  const isChecked = (ide) => {
    const isFavorite = pegarLocalStorage();
    if (isFavorite) {
      setFavorite(isFavorite.some((elemento) => elemento.id === ide));
    }
  };

  const fetchId = async (idFood) => {
    const vinte = 20;
    const seis = 6;
    if (location.pathname === `/drinks/${idFood}`) {
      const drink = await fetchDrinksId(idFood);
      const newArray = [];
      for (let count = 1; count <= vinte; count += 1) {
        if (drink.drinks[0][`strIngredient${count}`]) {
          newArray.push({
            ingrediente: drink.drinks[0][`strIngredient${count}`],
            medida: drink.drinks[0][`strMeasure${count}`] || '',
          });
        }
      }

      const { meals } = await fetchMealsMounth();
      const foods = meals.slice(0, seis);
      setRecomendacoes(foods);
      setIngredients(newArray);
      setDrinkOuFoods(drink.drinks);
      recipeProgressDrink(newArray, idFood);
    }
    if (location.pathname === `/foods/${idFood}`) {
      const food = await fetchFoodsId(idFood);
      const newArray = [];
      for (let count = 1; count <= vinte; count += 1) {
        if (food.meals[0][`strIngredient${count}`]) {
          newArray.push({
            ingrediente: food.meals[0][`strIngredient${count}`],
            medida: food.meals[0][`strMeasure${count}`] || '',
          });
        }
      }
      const { drinks } = await fetchDrinkMounth();
      const drinksSlice = drinks.slice(0, seis);
      setRecomendacoes(drinksSlice);
      setIngredients(newArray);
      setDrinkOuFoods(food.meals);
      recipeProgressFood(newArray, idFood);
    }
    isChecked(id);
  };

  const favoritaReceita = () => {
    setFavorite(!favorite);
    if (!favorite) {
      saveLocalStorage(drinkOuFoods);
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

  const redirecionaParaInPrograss = () => {
    if (location.pathname === `/drinks/${id}`) {
      if (!receitaProgress) {
        verifyLocalStorage(id, 'cocktails');
      }
      history.push(`/drinks/${id}/in-progress`);
    } else {
      if (!receitaProgress) {
        verifyLocalStorage(id, 'meals');
      }
      history.push(`/foods/${id}/in-progress`);
    }
  };

  useEffect(() => {
    fetchId(id);
  }, []);

  return (
    <section className="recipeDetails">
      {drinkOuFoods.length > 0 && drinkOuFoods.map((elemento) => (
        <Fragment key={ `${elemento.strDrinkThumb}fragment` }>
          <div className="recipeContainerImg">
            <img
              data-testid="recipe-photo"
              src={ elemento.strDrinkThumb || elemento.strMealThumb }
              alt={ elemento.strDrinkThumb || elemento.strMealThumb }
            />
          </div>

          <div className="containerTitulo">
            <h1 data-testid="recipe-title">
              { elemento.strDrink
                || elemento.strMeal}
            </h1>
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
              <input
                data-testid="share-btn"
                type="image"
                onClick={ compartilhar }
                src={ shareIcon }
                alt={ shareIcon }
              />
            </div>
          </div>
          <span className="DetailCategory" data-testid="recipe-category">
            {elemento.strAlcoholic
                || elemento.strCategory}

          </span>
          { LinkCopied && <span className="LinkCopiado">Link copied!</span>}

          <ul className="listaIngredientes">
            <h3>Ingredientes</h3>
            {ingredients.map((e, i) => (
              <div key={ e.ingrediente + i }>
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {`${e.ingrediente}${e.medida}`}
                </li>
              </div>
            ))}
          </ul>
          <div className="instrucoes">
            <h3>Instruções</h3>
            <p data-testid="instructions">{elemento.strInstructions}</p>
          </div>
          {elemento.strYoutube
          && (
            <div data-testid="video" className="videoYT">
              <iframe
                width="250"
                height="200"
                src={ elemento.strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;
                 autoplay; clipboard-write; encrypted-media;
                  gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>
          )}
          <h3 className="recomendacoes">Recomendações</h3>
          <div className="carousell">
            {recomendacoes.length > 0 && recomendacoes.map((element, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ element.idMeal || element.idDrink }
              >
                <div className="containerCarroussel">
                  <img
                    src={ element.strMealThumb || element.strDrinkThumb }
                    alt={ element.strDrink || element.strMeal }
                  />

                </div>
                <p data-testid={ `${index}-recomendation-title` }>
                  {element.strDrink || element.strMeal}

                </p>
              </div>
            )) }
          </div>
          {finishedRecipe
          && (
            <button
              className="bntStartRecipe"
              data-testid="start-recipe-btn"
              type="button"
              name={ receitaProgress ? 'Continue Recipe' : 'Start Recipe' }
              onClick={ redirecionaParaInPrograss }
            >
              {receitaProgress ? 'Continue Recipe' : 'Start Recipe' }

            </button>
          )}
        </Fragment>
      ))}
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;
