import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { fetchFoodsId } from '../fetch/fetchSearchRecipes';
import RecipeDetails from '../components/RecipeDetails';

function DetailsFood() {
  const { id } = useParams();
  const location = useLocation();
  return (
    <RecipeDetails id={ id } location={ location } />
  );
  // const { id } = useParams();
  // const [foodDetail, setFoodDetail] = useState([]);

  // useEffect(() => {
  //   const fetchId = async (idFood) => {
  //     const food = await fetchFoodsId(idFood);
  //     console.log(food);
  //     setFoodDetail(food);
  //   };
  //   fetchId(id);
  // }, []);

  // return (
  //   <div>
  //     <div>{id}</div>

  //     detalhes
  //   </div>
  // );
}

export default DetailsFood;
