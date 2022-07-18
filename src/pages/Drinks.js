import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mycontext from '../Context/MyContext';
import RecipieCard from '../components/RecipieCard';

function Drinks() {
  const { alert, dataDrinks } = useContext(Mycontext);

  return (
    <>
      <Header title="Drinks" isTrue drinks />
      {alert
        ? global.alert('Your search must have only 1 (one) character') : (
          dataDrinks.length && dataDrinks.map((element, idx) => (
            <div
              key={ element.idDrink + idx }
            >
              <RecipieCard
                idx={ idx }
                recipeName={ element.strDrink }
                strMealThumb={ element.strDrinkThumb }
              />
            </div>
          ))
        ) }
      <Footer />
    </>
  );
}

export default Drinks;
