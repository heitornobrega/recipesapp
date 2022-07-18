import React, { useContext } from 'react';
import Mycontext from '../Context/MyContext';
import CategoryButton from './CategoryButton';

function CategoryPanel() {
  const { dataSeachFoods } = useContext(Mycontext);
  const FIRSTS_CATEGORY = 5;
  const firstFiveRecipes = dataSeachFoods.slice(FIRSTS_CATEGORY);

  return (
    <div>
      {firstFiveRecipes
        .map((element) => (
          <CategoryButton
            strCategory={ element.strCategory }
            key={ element.strCategory }
          />))}
    </div>
  );
}

export default CategoryPanel;
