import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mycontext from '../Context/MyContext';
import RecipieCard from '../components/RecipieCard';

function Foods() {
  const { alert, dataFoods } = useContext(Mycontext);
  return (
    <>
      <Header title="Foods" isTrue foods />
      {console.log(dataFoods)}
      {alert
        ? global.alert('Your search must have only 1 (one) character') : (
          dataFoods.length > 0 && dataFoods.map((element, idx) => (
            <div
              key={ element.idMeal + idx }
            >
              <RecipieCard
                idx={ idx }
                recipeName={ element.strMeal }
                strMealThumb={ element.strMealThumb }
              />
            </div>
          ))
        ) }
      <Footer />
    </>
  );
}

export default Foods;
