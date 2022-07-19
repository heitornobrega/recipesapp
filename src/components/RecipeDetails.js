import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDrinkMounth, fetchDrinksId,
  fetchFoodsId, fetchMealsMounth } from '../fetch/fetchSearchRecipes';
// import Mycontext from '../Context/MyContext';

function RecipeDetails({ id, location }) {
  // const { dataFoods, dataDrinks } = useContext(Mycontext);
  const [drinkOuFoods, setDrinkOuFoods] = useState([]);
  // const [mealsOrDrinks, setMealsOrDrinks] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);

  const fetchId = async (idFood) => {
    const vinte = 20;
    const seis = 6;
    if (location.pathname === `/drinks/${id}`) {
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
      console.log(foods);
      // setMealsOrDrinks('Drink');
      setRecomendacoes(foods);
      setIngredients(newArray);
      console.log(drink.drinks);
      setDrinkOuFoods(drink.drinks);
    }
    if (location.pathname === `/foods/${id}`) {
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
      // setMealsOrDrinks('Food');
      setIngredients(newArray);
      setDrinkOuFoods(food.meals);
    }
  };

  useEffect(() => {
    fetchId(id);
  }, []);

  return (
    <section className="recipeDetails">
      {drinkOuFoods.length > 0 && drinkOuFoods.map((elemento) => (
        <>
          <div>
            <img
              data-testid="recipe-photo"
              src={ elemento.strDrinkThumb || elemento.strMealThumb }
              alt={ elemento.strDrinkThumb || elemento.strMealThumb }
            />
          </div>
          <h1 data-testid="recipe-title">{ elemento.strDrink || elemento.strMeal}</h1>
          <div data-testid="recipe-category">
            {elemento.strAlcoholic
          || elemento.strCategory}

          </div>
          <ul>
            <h3>ingredientes</h3>
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
          <div data-testid="instructions">{elemento.strInstructions}</div>
          {elemento.strYoutube
          && (
            <div data-testid="video">
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
          <div className="carousell">
            {recomendacoes.length > 0 && recomendacoes.map((element, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ element.idMeal || element.idDrink }
              >
                <div>
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
          <button
            className="bntStartRecipe"
            data-testid="start-recipe-btn"
            type="button"
          >
            Start Recipe

          </button>
        </>
      ))}
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;
