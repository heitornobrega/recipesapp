import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { fetchDrinksId } from '../fetch/fetchSearchRecipes';
import RecipeDetails from '../components/RecipeDetails';

function DetailsDrinks() {
  const { id } = useParams();
  const location = useLocation();
  // const [drinkDetail, setDrinkDetail] = useState([]);
  return (
    <RecipeDetails id={ id } location={ location } />
  );
  // const { id } = useParams();
  // const [drinkDetail, setDrinkDetail] = useState([]);

  // useEffect(() => {
  //   const fetchId = async (idFood) => {
  //     const drink = await fetchDrinksId(idFood);
  //     console.log(drink);
  //     setDrinkDetail(drink);
  //   };
  //   fetchId(id);
  // }, []);

  // return (
  //   <section>
  //     <div>
  //       <img src="" alt="" />
  //     </div>
  //     <h1>titulo</h1>
  //     <div>bebida alcolida ou nao</div>
  //     <ul>
  //       <li>lista de ingredientes</li>
  //     </ul>
  //     <div>instructions</div>
  //     <div>video</div>
  //     <div>recomendação</div>
  //     <button type="button">Start Recipe</button>
  //   </section>
  // );
}

export default DetailsDrinks;
