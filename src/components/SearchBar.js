import React from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="searchInput">
        <input type="text" data-testid="search-input" id="searchInput" />
      </label>
      <label htmlFor="ingredients">
        <input
          type="radio"
          name="filter"
          id="ingredients"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="filter"
          id="name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          type="radio"
          name="filter"
          id="firstLetter"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
