import React, { useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';

function DoneRecipes() {
  const [filterBtn, setFilterBtn] = useState('all');
  const [doneRecipes] = useState(localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : []);

  const getArrayRecipes = () => {
    if (doneRecipes.length === 0 || doneRecipes === null) {
      return <p>Nenhuma receita!</p>;
    }
    if (filterBtn === 'all') {
      return (doneRecipes.map((element, index) => (
        <CardDoneRecipe
          key={ element.id }
          index={ index }
          id={ element.id }
          type={ element.type }
          nationality={ element.nationality }
          category={ element.category }
          alcoholicOrNot={ element.alcoholicOrNot }
          name={ element.name }
          image={ element.image }
          doneDate={ element.doneDate }
          tags={ element.tags }
        />
      )));
    }
    return (doneRecipes.filter((element) => element.type === filterBtn)
      .map((element, i) => (
        <CardDoneRecipe
          key={ element.id }
          index={ i }
          id={ element.id }
          type={ element.type }
          nationality={ element.nationality }
          category={ element.category }
          alcoholicOrNot={ element.alcoholicOrNot }
          name={ element.name }
          image={ element.image }
          doneDate={ element.doneDate }
          tags={ element.tags }
        />
      )));
  };

  return (
    <>
      <Header title="Done Recipes" isTrue={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterBtn('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterBtn('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterBtn('drink') }
      >
        Drinks
      </button>
      <div>
        { getArrayRecipes() }
      </div>
    </>
  );
}

export default DoneRecipes;
