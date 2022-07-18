const fetchSearchRecipes = async (objeto) => {
  const { searchFoods, searchRadio, drinks, foods } = objeto;
  let url = '';
  if (foods) {
    switch (searchRadio) {
    case 'ingredients':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFoods}`;
      break;
    case 'name':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoods}`;
      break;
    case 'firstLetter':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFoods}`;
      break;
    case '':
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      // console.log('esse');
      break;
    default:
      // console.log('cagou a url');
      url = '';
    }
  }
  if (drinks) {
    switch (searchRadio) {
    case 'ingredients':
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFoods}`;
      break;
    case 'name':
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchFoods}`;
      break;
    case 'firstLetter':
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchFoods}`;
      break;
    case '':
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      break;
    default:
      url = '';
    }
  }

  const response = await fetch(url);
  const json = await response.json();
  // console.log(json);
  return json;
};

export const fetchMealsMounth = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const json = await response.json();
  // console.log(json);
  return json;
};

export const fetchDrinkMounth = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const json = await response.json();
  // console.log(json);
  return json;
};

export default fetchSearchRecipes;
