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

export const localStorageInProgress = (obj, id, location) => {
  if (location.includes('drinks')) {
    if (localStorage.getItem('inProgressRecipes')) {
      console.log('aqui');
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const objs = {
        cocktails: { [id]: [...obj] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgress,
        cocktails: { ...inProgress.cocktails, ...objs.cocktails },
      }));
    } else {
      const objs = {
        cocktails: { [id]: obj },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objs));
    }
  }
  if (location.includes('foods')) {
    if (localStorage.getItem('inProgressRecipes')) {
      const objs = {
        meals: { [id]: [...obj] },
      };
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgress,
        meals: { ...inProgress.meals, ...objs.meals } }));
    } else {
      const objs = {
        meals: { [id]: obj },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objs));
    }
  }
};

// export const localStorageInProgressMeals = (obj, id) => {
//   console.log(id);
//   if (localStorage.getItem('inProgressRecipes')) {
//     const objs = {
//       meals: { [id]: [...obj] },
//     };
//     const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
//     localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgress,
//       ...objs }));
//   } else {
//     const objs = {
//       meals: { [id]: obj },
//     };
//     localStorage.setItem('inProgressRecipes', JSON.stringify(objs));
//   }
// };
