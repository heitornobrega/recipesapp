import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Mycontext from '../Context/MyContext';

function SearchBar({ foods, drinks }) {
  const { handleSearchFoods } = useContext(Mycontext);

  const [searchFoods, setsearchFoods] = useState('');
  const [searchRadio, setsearchRadio] = useState('');

  return (
    <form className="SearchBar">
      <label htmlFor="searchInput" className="labelText">
        <input
          type="text"
          data-testid="search-input"
          id="searchInput"
          name="searchInput"
          onChange={ (e) => setsearchFoods(e.target.value) }
          placeholder="Pesquisar"
        />
      </label>
      <div className="containerInputRadio">
        <label htmlFor="ingredients">
          <input
            type="radio"
            name="filter"
            id="ingredients"
            value="ingredients"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setsearchRadio(e.target.value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="filter"
            id="name"
            value="name"
            data-testid="name-search-radio"
            onChange={ (e) => setsearchRadio(e.target.value) }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="filter"
            id="firstLetter"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setsearchRadio(e.target.value) }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchFoods({ searchFoods,
          searchRadio,
          foods,
          drinks }) }
      >
        Search

      </button>

    </form>
  );
}

SearchBar.propTypes = {
  foods: PropTypes.bool.isRequired,
  drinks: PropTypes.bool.isRequired,
};

export default SearchBar;
