import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import MyContext from '../Context/MyContext';

function Footer() {
  const { setobjSearchFoods } = useContext(MyContext);
  const history = useHistory();

  // const redirecionaDrinks = () => {

  // };

  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => {
          setobjSearchFoods({ searchRadio: '', drinks: true });
          console.log('qui');
          history.push('/drinks');
        } }
      >
        <img src={ drinkIcon } alt="drink-img" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => {
          setobjSearchFoods({ searchRadio: '', foods: true });
          history.push('/foods');
        } }
      >
        <img src={ mealIcon } alt="meal-img" data-testid="food-bottom-btn" />
      </button>
    </div>
  );
}

export default Footer;
