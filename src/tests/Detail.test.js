import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
// import aquamarine from './mocks/mockDrinkIdAquamarine'
// import {fetchDrinksId} from '../fetch/fetchSearchRecipes'
import mockFetch from '../../cypress/mocks/fetch'
import { string } from "prop-types";
// import arrabiata from './mocks/mockMealSpicyArrabiata'

const mockLocal = [
  {
      "id": "52771",
      "type": "food",
      "nationality": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
  }
]

const mockLocalDrink = [
  {
    'id': '178319',
    'type': 'drink',
    'nationality': '',
    'category': 'Cocktail',
    'alcoholicOrNot': 'Alcoholic',
    'name': 'Aquamarine',
    'image': 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    
  }
]

describe('testando componenteDetail', () => {
  afterEach(() => global.fetch.mockRestore())

  test('testando a pagina foods com id 52771', async () => {
    const lista = {
      meals: {
        ['52771'] : []}
    }

    // localStorage.clear()
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    localStorage.setItem('inProgressRecipes', JSON.stringify(lista))
    const {history} = renderWithRouter(<App />, ['/foods/52771']);

    const inputCompartilhar = await screen.findByTestId('share-btn')
    const inputFavorite = await screen.findByTestId('favorite-btn')
    expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
    userEvent.click(inputFavorite)
    expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
    const startRecipe = screen.getByTestId('start-recipe-btn')
    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/foods/52771/in-progress')

    // userEvent.click(inputCompartilhar)
    // expect(screen.getByText(/Link Codied/))
  });

  test('testando a pagina drinks com id 178319 o botao start recipe', async () => {

    const lista = {
      cocktails: {
        ['178319'] : []},
        meals: {
          ['52771'] : []}
    }
  
    const lista2 = {
      meals: {
        ['52771'] : []}
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(lista))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
      // jest.spyOn(global, "fetch").mockImplementation((url) =>
    // Promise.resolve({
    //   json: ()  => {
    //     if(url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine')
    //    return Promise.resolve(aquamarine)
    //    if(url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319')
    //      return Promise.resolve(aquamarine)
    //    if(url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    //    return Promise.resolve(drinks)
    //   }
    // }))

    

    const recipeFoto = await screen.findByTestId('recipe-photo')
  const title =  screen.getByRole('heading', { name: /aquamarine/i})
  const ingreD0 = screen.findByTestId(/0-ingredient-name-and-measure/i)
  const ingreD1 = screen.findByTestId(/1-ingredient-name-and-measure/i)
  const ingreD3 = screen.findByTestId(/2-ingredient-name-and-measure/i)
  const intrucao = screen.getByTestId('instructions')
  const allImg = screen.getAllByRole('img')
    expect(recipeFoto).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(intrucao).toBeInTheDocument()
    expect(allImg).toHaveLength(7)

    const startRecipe = screen.getByTestId('start-recipe-btn')
    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/drinks/178319/in-progress')
  });

  test('testando a pagina foods com id 52771', async () => {
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

    const recipeFoto = await screen.findByTestId('recipe-photo')
  const title =  screen.getByRole('heading', { name: /spicy arrabiata penne/i})
  const ingreD0 = screen.findByTestId(/0-ingredient-name-and-measure/i)
  const ingreD1 = screen.findByTestId(/1-ingredient-name-and-measure/i)
  const ingreD2 = screen.findByTestId(/3-ingredient-name-and-measure/i)
  const ingreD3 = screen.findByTestId(/4-ingredient-name-and-measure/i)
  const ingreD4 = screen.findByTestId(/5-ingredient-name-and-measure/i)
  const ingreD5 = screen.findByTestId(/6-ingredient-name-and-measure/i)
  const ingreD6 = screen.findByTestId(/7-ingredient-name-and-measure/i)
  const ingreD7 = screen.findByTestId(/8-ingredient-name-and-measure/i)
  const intrucao = screen.getByTestId('instructions')
  const allImg = screen.getAllByRole('img')
    expect(recipeFoto).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(intrucao).toBeInTheDocument()
    expect(allImg).toHaveLength(7)
  });

  test('testando se ao renderizar a pagina ja esta favoritado', async () => {
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
   localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

    const inputFavorite = await screen.findByTestId('favorite-btn')
    expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
    userEvent.click(inputFavorite)
    expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
    const recebeLocalStorage =  localStorage.getItem('favoriteRecipes')    
    expect(recebeLocalStorage).toEqual('[]')
  });

  
  test('testando a função de favoritar uma bebida', async () => {
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
   localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

    const inputFavorite = await screen.findByTestId('favorite-btn')
    expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
    userEvent.click(inputFavorite)
    expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
    const recebeLocalStorage =  localStorage.getItem('favoriteRecipes')    
    expect(JSON.parse(recebeLocalStorage)).toHaveLength(2)
  });


  test('testando a função de favoritar uma comida', async () => {
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
   localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDrink))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

    const inputFavorite = await screen.findByTestId('favorite-btn')
    expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
    userEvent.click(inputFavorite)
    expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
    const recebeLocalStorage =  localStorage.getItem('favoriteRecipes')    
    expect(JSON.parse(recebeLocalStorage)).toHaveLength(2)
  });

  test('testando clipBoard', async () => {
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const inputCompartilhar = await screen.findByTestId('share-btn')
    jest.spyOn(navigator.clipboard, "writeText");
    userEvent.click(inputCompartilhar)
    expect(screen.getByText(/Link Copied/i))
    expect(navigator.clipboard.writeText).toBeCalled()
  });
  test('testando se o botao nao exite', async () => {

    const lista2 = {
      meals: {
        ['52771']: [
          {
            "ingrediente": "penne rigate",
            "checked": true,
            "quantidade": "1 pound"
          },
          {
            "ingrediente": "olive oil",
            "checked": true,
            "quantidade": "1/4 cup"
          },
          {
            "ingrediente": "garlic",
            "checked": true,
            "quantidade": "3 cloves"
          },
          {
            "ingrediente": "chopped tomatoes",
            "checked": true,
            "quantidade": "1 tin "
          },
          {
            "ingrediente": "red chile flakes",
            "checked": true,
            "quantidade": "1/2 teaspoon"
          },
          {
            "ingrediente": "italian seasoning",
            "checked": true,
            "quantidade": "1/2 teaspoon"
          },
          {
            "ingrediente": "basil",
            "checked": true,
            "quantidade": "6 leaves"
          },
          {
            "ingrediente": "Parmigiano-Reggiano",
            "checked": true,
            "quantidade": "spinkling"
          }
        ]
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(lista2))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    const btnStart = screen.queryByTestId('start-recipe-btn')
    expect(btnStart).not.toBeInTheDocument()
  });
  test('testando se o botao exite foods', async () => {

    const lista2 = {
      meals: {
        ['52771']: [
          {
            "ingrediente": "penne rigate",
            "checked": true,
            "quantidade": "1 pound"
          },
          {
            "ingrediente": "olive oil",
            "checked": true,
            "quantidade": "1/4 cup"
          },
          {
            "ingrediente": "garlic",
            "checked": true,
            "quantidade": "3 cloves"
          },
          {
            "ingrediente": "chopped tomatoes",
            "checked": true,
            "quantidade": "1 tin "
          },
          {
            "ingrediente": "red chile flakes",
            "checked": true,
            "quantidade": "1/2 teaspoon"
          },
          {
            "ingrediente": "italian seasoning",
            "checked": true,
            "quantidade": "1/2 teaspoon"
          },
          {
            "ingrediente": "basil",
            "checked": true,
            "quantidade": "6 leaves"
          },
          {
            "ingrediente": "Parmigiano-Reggiano",
            "checked": false,
            "quantidade": "spinkling"
          }
        ]
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(lista2))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    const btnStart = await screen.findByTestId('start-recipe-btn')
    expect(btnStart).toBeInTheDocument()
  });
  test('testando se o botao exite drinks', async () => {
    localStorage.clear()
    const lista2 = {
      cocktails: {
        ['178319']: [
          {
              "ingrediente": "Hpnotiq",
              "checked": true,
              "quantidade": "2 oz"
          },
          {
              "ingrediente": "Pineapple Juice",
              "checked": true,
              "quantidade": "1 oz"
          },
          {
              "ingrediente": "Banana Liqueur",
              "checked": true,
              "quantidade": "1 oz"
          }
      ]
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(lista2))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
    const btnStart = screen.queryByTestId('start-recipe-btn')
    // expect(btnStart).toHaveProperty('name','Continue Recipe')
    expect(btnStart).not.toBeInTheDocument()
  });
  test('testando se o botao exite drinks', async () => {
    localStorage.clear()
    const lista2 = {
      cocktails: {
        ['178319']: [
          {
              "ingrediente": "Hpnotiq",
              "checked": true,
              "quantidade": "2 oz"
          },
          {
              "ingrediente": "Pineapple Juice",
              "checked": true,
              "quantidade": "1 oz"
          },
          {
              "ingrediente": "Banana Liqueur",
              "checked": false,
              "quantidade": "1 oz"
          }
      ]
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(lista2))
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
    const btnStart = await screen.findByTestId('start-recipe-btn')
    expect(btnStart).toHaveProperty('name','Continue Recipe')
    expect(btnStart).toBeInTheDocument()
  });
  test('testando se ao clicar no botao vai para proxima pagina, foods', async () => {
    localStorage.clear()
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    const btnStart = await screen.findByTestId('start-recipe-btn')
    expect(history.location.pathname).toBe('/foods/52771')
    expect(btnStart).toBeInTheDocument()
    userEvent.click(btnStart)
    expect(history.location.pathname).toBe('/foods/52771/in-progress')
  });
  test('testando se ao clicar no botao vai para proxima pagina, drinks', async () => {
    localStorage.clear()
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
    const btnStart = await screen.findByTestId('start-recipe-btn')
    expect(history.location.pathname).toBe('/drinks/178319')
    expect(btnStart).toBeInTheDocument()
    userEvent.click(btnStart)
    expect(history.location.pathname).toBe('/drinks/178319/in-progress')
  });
 

})