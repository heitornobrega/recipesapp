import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipe({
  index,
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  doneDate,
  tags,
}) {
  const [copyConditional, setCopyConditional] = useState(false);
  const recipeType = type === 'food' ? nationality : alcoholicOrNot;

  const copyLink = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyConditional(true);
    setTimeout(() => setCopyConditional(false), Number('1000'));
  };

  return (
    <div className="containerDone">
      <div className="imgAndElements">
        <div className="containerImgDone">
          <Link key={ id } to={ `/${type}s/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ `recipe-done-${index}` }
              className="imgMenorDone"
            />
          </Link>
        </div>
        <div>
          <p
            className="nationalityCategory"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipeType} - ${category}` }
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>
            { name }
          </h3>
          <div className="dataEShareContainer">

            <p
              data-testid={ `${index}-horizontal-done-date` }

            >
              { doneDate }
            </p>
            <div className="shareBtnDone">
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                onClick={ copyLink }
                src={ shareIcon }
                alt={ shareIcon }
              />

              {copyConditional && <p
                className="LinkCopiado favoriteRecipesCopy linkCopiedDone"
              >
                Link copied!

              </p>}
            </div>

          </div>

          {
            tags.map((tag, i) => (
              <span key={ i } data-testid={ `${i}-${tag}-horizontal-tag` }>
                { tag }
              </span>
            ))
          }

        </div>

      </div>

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
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf.isRequired,
};

export default CardDoneRecipe;
