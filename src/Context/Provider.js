import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Mycontext from './MyContext';
import fetchSearchRecipes,
{
  fetchMealsMounth,
  fetchDrinkMounth, fetchByCategory,
} from '../fetch/fetchSearchRecipes';

function Provider({ children }) {
  const location = useLocation();
  const [user, setUser] = useState();
  const [objSearchFoods, setobjSearchFoods] = useState({});
  const [dataSeachFoods, setdataSeachFoods] = useState([]);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState({});
  // const [filteredData, setFilteredData] = useState({});
  // const [foodsAreLoaded, setFoodsAreLoaded] = useState(false);
  const history = useHistory();

  const handleSubmit = (users) => {
    localStorage.setItem('user', JSON.stringify({ email: users.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUser(users.email);
    history.push('/foods');
  };

  useEffect(() => {
    const FIRST_RECIPIES = 12;
    const fetchMeals = async () => {
      const { meals } = await fetchMealsMounth();
      if (meals) {
        const firstTwelveRecipes = meals.slice(0, FIRST_RECIPIES);
        setDataFoods(firstTwelveRecipes);
      }
    };
    if (location.pathname.includes('foods')) {
      fetchMeals();
    }
  }, []);

  useEffect(() => {
    const FIRST_RECIPIES = 12;
    const fetchDrink = async () => {
      const { drinks } = await fetchDrinkMounth();
      if (drinks) {
        const firstTwelveRecipes = drinks.slice(0, FIRST_RECIPIES);
        setDataDrinks(firstTwelveRecipes);
      }
    };
    if (location.pathname.includes('drinks')) {
      fetchDrink();
    }
  }, []);

  useEffect(() => {
    const { onDrinks, onFoods, value } = filterByCategory;
    const FIRST_RECIPIES = 12;
    const fillData = async () => { // Essa funcao filtra os dados pelos botoes de categoria
      if (onFoods && value !== 'All') {
        const { meals } = await fetchByCategory(filterByCategory);
        const firstTwelveRecipes = meals.slice(0, FIRST_RECIPIES);
        setDataFoods(firstTwelveRecipes);
      }
      if (onDrinks && value !== 'All') {
        const { drinks } = await fetchByCategory(filterByCategory);
        const firstTwelveRecipes = drinks.slice(0, FIRST_RECIPIES);
        setDataDrinks(firstTwelveRecipes);
      }
      if (onFoods && value === 'All') {
        const { meals } = await fetchMealsMounth();
        const firstTwelveRecipes = meals.slice(0, FIRST_RECIPIES);
        setDataFoods(firstTwelveRecipes);
      }
      if (onDrinks && value === 'All') {
        const { drinks } = await fetchDrinkMounth();
        const firstTwelveRecipes = drinks.slice(0, FIRST_RECIPIES);
        setDataDrinks(firstTwelveRecipes);
      }
    };
    fillData();
  }, [filterByCategory]);

  const fetchApi = async (obj) => {
    const FIRST_RECIPIES = 12;
    const respostaApi = await fetchSearchRecipes(obj);
    // console.log(respostaApi);
    if (respostaApi.meals) {
      const { meals } = respostaApi;
      const firstTwelveRecipes = meals && meals.slice(0, FIRST_RECIPIES);
      setDataFoods(firstTwelveRecipes);
      if (respostaApi.meals.length === 1) {
        history.push(`/foods/${respostaApi.meals[0].idMeal}`);
      }
    }
    if (respostaApi.drinks) {
      const { drinks } = respostaApi;
      const firstTwelveRecipes = drinks && drinks.slice(0, FIRST_RECIPIES);
      setDataDrinks(firstTwelveRecipes);
      if (respostaApi.drinks.length === 1) {
        history.push(`/drinks/${respostaApi.drinks[0].idDrink}`);
      }
    }
    if (respostaApi.meals === null || respostaApi.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleSearchFoods = (obj) => {
    const { searchFoods, searchRadio } = obj;
    if (searchRadio === 'firstLetter' && searchFoods.length > 1) {
      setAlert(true);
    } else {
      setAlert(false);
      fetchApi({ ...obj });
    }
  };
  const context = {
    // foodsAreLoaded,
    // setFoodsAreLoaded,
    // filteredData,
    handleSubmit,
    user,
    handleSearchFoods,
    dataSeachFoods,
    alert,
    setobjSearchFoods,
    objSearchFoods,
    setdataSeachFoods,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    setFilterByCategory,
  };

  return (
    <Mycontext.Provider value={ context }>
      {children}
    </Mycontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
