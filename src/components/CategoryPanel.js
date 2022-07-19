import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CategoryPanel({ foods: onFoods, drinks: onDrinks }) {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategories = async () => {
    if (onFoods) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();
      setCategoryData(meals);
    }
    if (onDrinks) {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await response.json();
      setCategoryData(drinks);
    }
  };
  useEffect(() => { fetchCategories(); }, []);

  const FIRSTS_CATEGORY = 5;
  const firstFiveRecipes = categoryData && categoryData.slice(0, FIRSTS_CATEGORY);

  return (
    <div>
      {firstFiveRecipes && firstFiveRecipes.map((element, idx) => (
        <button
          type="button"
          key={ idx }
          data-testid={ `${element.strCategory}-category-filter` }
        >
          {element.strCategory}
        </button>))}
    </div>
  );
}

CategoryPanel.propTypes = {
  foods: PropTypes.bool,
  drinks: PropTypes.bool,
};

CategoryPanel.defaultProps = {
  foods: null,
  drinks: null,
};
export default CategoryPanel;
