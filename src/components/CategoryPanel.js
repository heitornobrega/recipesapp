import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';

function CategoryPanel({ foods: onFoods, drinks: onDrinks }) {
  const { setFilterByCategory } = useContext(MyContext);
  const [categoryData, setCategoryData] = useState([]);
  const [actualValue, setActualValue] = useState([]);

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
    <div className="containerCategory">
      <button
        type="button"
        value="All"
        onClick={ ({ target }) => {
          const { value } = target;
          setFilterByCategory({
            onFoods, onDrinks, value,
          });
        } }
        data-testid="All-category-filter"
      >
        All
      </button>
      {firstFiveRecipes && firstFiveRecipes.map((element, idx) => (
        <button
          value={ element.strCategory === actualValue ? 'All' : element.strCategory }
          type="button"
          key={ idx }
          data-testid={ `${element.strCategory}-category-filter` }
          onClick={ (event) => {
            const { target } = event;
            const { value } = target;
            setFilterByCategory({
              onFoods, onDrinks, value,
            });
            setActualValue(value);
          } }
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
