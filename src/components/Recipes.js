import React from 'react';
import PropTypes from 'prop-types';

function RecipieCard({ recipeName, idx, strMealThumb }) {
  return (
    <div data-testid={ `${idx}-recipe-card` }>
      <img
        className="recipiesImg"
        data-testid={ `${idx}-card-img` }
        src={ strMealThumb }
        alt={ recipeName }
      />
      <p
        data-testid={ `${idx}-card-name` }
      >
        {recipeName}
      </p>
    </div>
  );
}

RecipieCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
};
export default RecipieCard;
