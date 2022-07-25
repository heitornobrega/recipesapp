import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mycontext from '../Context/MyContext';
import RecipieCard from '../components/Recipes';

function Drinks() {
  const { alert, dataDrinks } = useContext(Mycontext);

  return (
    <>
      <Header title="Drinks" isTrue drinks />
      <div className="divCards">
        {alert
          ? global.alert('Your search must have only 1 (one) character') : (
            dataDrinks.length && dataDrinks.map((element, idx) => (
              <Link key={ element.idDrink + idx } to={ `/drinks/${element.idDrink}` }>
                <div>
                  <RecipieCard
                    idx={ idx }
                    recipeName={ element.strDrink }
                    strMealThumb={ element.strDrinkThumb }
                  />
                </div>
              </Link>
            ))
          ) }
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
