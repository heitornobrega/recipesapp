export const saveLocalStorage = (drinkOuFoods) => {
  const listaVarovitas = localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const obj = {
    id: drinkOuFoods[0].idDrink || drinkOuFoods[0].idMeal,
    type: drinkOuFoods[0].idDrink ? 'drink' : 'food',
    nationality: drinkOuFoods[0].strArea || '',
    category: drinkOuFoods[0].strCategory || '',
    alcoholicOrNot: drinkOuFoods[0].strAlcoholic || '',
    name: drinkOuFoods[0].strDrink || drinkOuFoods[0].strMeal,
    image: drinkOuFoods[0].strDrinkThumb || drinkOuFoods[0].strMealThumb,
  };
  if (listaVarovitas.length > 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...listaVarovitas, obj]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  }
};
export const removeLocalStorage = (id) => {
  const listaVarovitas = localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const removePeloId = listaVarovitas.filter((elemento) => elemento.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(removePeloId));
};

export const pegarLocalStorage = () => {
  if (localStorage.getItem('favoriteRecipes')) {
    console.log('aqui');
    const favoritoLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoritoLocal;
  }
};
