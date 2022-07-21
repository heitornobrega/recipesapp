import React, { useState } from 'react';
import CardDFavoriteRecipes from '../components/CardDFavoriteRecipes';
import Header from '../components/Header';

function Favorite() {
  const [filterBtn, setFilterBtn] = useState('all');
  const [favoriteList,
    setFavoriteList] = useState(localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);

  const getArrayRecipes = () => {
    if (favoriteList.length === 0 || favoriteList === null) {
      return <p>Nenhuma receita!</p>;
    }
    if (filterBtn === 'all') {
      return (favoriteList.map((element, index) => (
        <CardDFavoriteRecipes
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
          fav={ favoriteList }
          setFavoriteList={ setFavoriteList }
        />
      )));
    }

    return (favoriteList.filter((element) => element.type === filterBtn)
      .map((element, i) => (
        <CardDFavoriteRecipes
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
          fav={ favoriteList }
          setFavoriteList={ setFavoriteList }
        />
      )));
  };

  return (
    <>
      <Header title="Favorite Recipes" isTrue={ false } />
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

export default Favorite;
