import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import { removeLocalStorage } from '../fetch/localStorageFunc';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardDoneRecipe({
  index,
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  fav,
  setFavoriteList,
}) {
  const [copyConditional, setCopyConditional] = useState(false);
  const recipeType = type === 'food' ? nationality : alcoholicOrNot;

  const copyLink = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyConditional(true);
    setTimeout(() => setCopyConditional(false), Number('1000'));
  };

  const favoritaReceita = () => {
    setFavoriteList(fav.filter((elemento) => elemento.id !== id));

    removeLocalStorage(id);
  };

  return (
    <div>
      <Link key={ id } to={ `/${type}s/${id}` }>
        <div>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `recipe-done-${index}` }
            className="imgMenor"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${recipeType} - ${category}` }
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>
            { name }
          </h3>
        </div>
      </Link>
      <input
        data-testid={ `${index}-horizontal-share-btn` }
        type="image"
        onClick={ copyLink }
        src={ shareIcon }
        alt={ shareIcon }
      />
      { copyConditional && <p>Link copied!</p>}
      <label htmlFor="favorite">
        <input
          type="image"
          src={ blackHeartIcon }
          alt="favorite"
          name="favorite"
          id="favorite"
          onClick={ favoritaReceita }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </label>
    </div>

  );
}

CardDoneRecipe.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  fav: PropTypes.arrayOf(Object).isRequired,
  setFavoriteList: PropTypes.func.isRequired,
};

export default CardDoneRecipe;
