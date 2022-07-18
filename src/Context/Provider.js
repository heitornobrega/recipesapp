import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Mycontext from './MyContext';
import fetchSearchRecipes,
{ fetchMealsMounth, fetchDrinkMounth } from '../fetch/fetchSearchRecipes';

function Provider({ children }) {
  const [user, setUser] = useState();
  const [objSearchFoods, setobjSearchFoods] = useState({});
  const [dataSeachFoods, setdataSeachFoods] = useState([]);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  const handleSubmit = (users) => {
    localStorage.setItem('user', JSON.stringify({ email: users.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUser(users);
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
    fetchMeals();
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
    fetchDrink();
  }, []);

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
