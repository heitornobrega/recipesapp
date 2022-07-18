import React from 'react';

function CategoryButton({ strCategory }) {
  return (
    <button
      type="button"
      data-testid={ `${strCategory}-category-filter` }
    >
      {strCategory}
    </button>
  );
}
CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,

};
export default CategoryButton;
