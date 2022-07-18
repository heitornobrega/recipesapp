// import React, { useContext, useEffect, useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import RecipieCard from './RecipieCard';
// import Mycontext from '../Context/MyContext';
// import fetchSearchRecipes from '../fetch/fetchSearchRecipes';

// function Recipes() {
//   const { /* dataSeachFoods */ objSearchFoods } = useContext(Mycontext);
//   const location = useLocation();
//   const history = useHistory();
//   const [dataFoods, setDataFoods] = useState([]);
//   const [recipeNameEThumb, setRecipeNameEThumb] = useState({
//     recipesName: '', recipesThumb: '' });
//   // const [strThumb, setStrThumb] = useState('')

//   const fetchApiFoods = async () => {
//     const FIRST_RECIPIES = 12;
//     const respostaApi = await fetchSearchRecipes({ searchRadio: '', foods: true });
//     const { meals } = respostaApi;
//     const firstTwelveRecipes = meals && meals.slice(0, FIRST_RECIPIES);
//     setRecipeNameEThumb({ recipesName: 'strMeal', recipesThumb: 'strMealThumb' });
//     // setRecipeName('strMeal');
//     setDataFoods(firstTwelveRecipes);
//   };

//   const fetchApiDrinks = async () => {
//     const FIRST_RECIPIES = 12;
//     const respostaApi = await fetchSearchRecipes({ searchRadio: '', drinks: true });
//     const { drinks } = respostaApi;
//     const firstTwelveRecipes = drinks && drinks.slice(0, FIRST_RECIPIES);
//     setRecipeNameEThumb({ recipesName: 'strDrink', recipesThumb: 'strDrinkThumb' });
//     // setRecipeName('strDrink');
//     setDataFoods(firstTwelveRecipes);
//   };

//   const fetchApi = async () => {
//     const respostaApi = await fetchSearchRecipes(objSearchFoods);
//     const { meals } = respostaApi;
//     setDataFoods(meals);

//     if (respostaApi.meals.length === 1) {
//       history.push(`/foods/${respostaApi.meals[0].idMeal}`);
//     }
//     if (respostaApi.drinks.length === 1) {
//       history.push(`/drinks/${respostaApi.drinks[0].idDrink}`);
//     }
//   };

//   useEffect(() => {
//     fetchApi();
//   }, [objSearchFoods]);

//   useEffect(() => {
//     console.log(location);
//     if (location.pathname === '/foods') {
//       console.log('dentro1');
//       fetchApiFoods();
//     }
//     if (location.pathname === '/drinks') {
//       console.log('dentro2');
//       fetchApiDrinks();
//     }
//   }, []);

//   // useEffect(() => {
//   //   console.log('dataSeachFoods');
//   //   const { meals } = dataSeachFoods;
//   //   console.log(meals);
//   //   setDataFoods(meals);
//   // }, [objSearchFoods]);

//   // const { meals } = dataSeachFoods;

//   // const FIRST_RECIPIES = 12;
//   // let firstTwelveRecipes = [];
//   // let recipeName = '';
//   // let comidaOuBebida = [];

//   // useEffect(() => {
//   //   if (location.pathname === '/foods') {
//   //     recipeName = 'strMeal';
//   //     comidaOuBebida = dataSeachFoods.meals;
//   //     const { meals } = dataSeachFoods;
//   //     firstTwelveRecipes = meals && meals.slice(0, FIRST_RECIPIES);

//   //     // setobjSearchFoods({ foods: true, searchRadio: '' });
//   //   } else if (location.pathname === '/drinks') {
//   //     comidaOuBebida = dataSeachFoods.drinks;

//   //     const { drinks } = dataSeachFoods;
//   //     recipeName = 'strDrink';
//   //     firstTwelveRecipes = drinks && drinks.slice(0, FIRST_RECIPIES);
//   //     // setobjSearchFoods({ drinks: true, searchRadio: '' });
//   //   }
//   // }, []);

//   return (
//     <div>
//       {console.log(dataFoods)}
//       {dataFoods && dataFoods
//         .map((element, idx) => (
//           <div
//             key={ element.idMeal }
//           >
//             <RecipieCard
//               idx={ idx }
//               recipeName={ element[recipeNameEThumb.recipesName] }
//               strMealThumb={ element[recipeNameEThumb.recipesThumb] }
//             />
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Recipes;
