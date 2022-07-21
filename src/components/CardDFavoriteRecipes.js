import React, { useState /* useEffect */ } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import { /* pegarLocalStorage */
  removeLocalStorage /* saveLocalStorage */ } from '../fetch/localStorageFunc';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
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
  // doneDate,
  // tags,
}) {
  const [copyConditional, setCopyConditional] = useState(false);
  // const [favorite, setFavorite] = useState(false);
  const recipeType = type === 'food' ? nationality : alcoholicOrNot;

  const copyLink = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyConditional(true);
    setTimeout(() => setCopyConditional(false), Number('1000'));
  };

  // const isChecked = (ide) => {
  //   const isFavorite = pegarLocalStorage();
  //   if (isFavorite) {
  //     setFavorite(isFavorite.some((elemento) => elemento.id === ide));
  //   }
  // };

  // useEffect(() => {
  // isChecked(id);
  // }, []);

  const favoritaReceita = (/* { target: { checked } } */) => {
    // setFavorite(!favorite);
    // if (!favorite) {
    //   saveLocalStorage(fav);
    // }
    // if (favorite) {
    setFavoriteList(fav.filter((elemento) => elemento.id !== id));

    removeLocalStorage(id);
  };
  // };

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
          {/* <p data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </p> */}
          {/* {
            tags.map((tag, i) => (
              <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                { tag }
              </span>
            ))
          } */}
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
  // doneDate: PropTypes.string.isRequired,
  // tags: PropTypes.arrayOf.isRequired,
};

export default CardDoneRecipe;
