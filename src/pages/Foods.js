import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mycontext from '../Context/MyContext';
import RecipieCard from '../components/RecipieCard';

function Foods() {
  const { alert, dataFoods } = useContext(Mycontext);
  return (
    <>
      <Header title="Foods" isTrue foods />
      {alert
        ? global.alert('Your search must have only 1 (one) character') : (
          dataFoods.length > 0 && dataFoods.map((element, idx) => (
            <Link key={ element.idMeal + idx } to={ `/foods/${element.idMeal}` }>
              <div>
                <RecipieCard
                  idx={ idx }
                  recipeName={ element.strMeal }
                  strMealThumb={ element.strMealThumb }
                />
              </div>
            </Link>
          ))
        ) }
      <Footer />
    </>
  );
}

export default Foods;
