import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import MyContext from '../Context/MyContext';

function Footer() {
  const { setobjSearchFoods } = useContext(MyContext);
  const history = useHistory();

  return (
    <section data-testid="footer" className="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="drink-img"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          setobjSearchFoods({ searchRadio: '', drinks: true });
          history.push('/drinks');
        } }
      />

      <input
        type="image"
        src={ mealIcon }
        alt="meal-img"
        data-testid="food-bottom-btn"
        onClick={ () => {
          setobjSearchFoods({ searchRadio: '', foods: true });
          history.push('/foods');
        } }
      />
    </section>
  );
}

export default Footer;
