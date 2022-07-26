import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch from '../../cypress/mocks/fetch'
import { saveLocalStorage } from "../fetch/localStorageFunc";

const mockLocalFood = [
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
  const mockTestCheckBox = {
    "meals": {
        "52771": [
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
  const mockTestCheckBox2 = {
    "meals": {
       '52771': []
    }
}

describe('Testa a pagina food-in-progress', () => {
  afterEach(() => global.fetch.mockRestore())

    afterEach(() => localStorage.clear())
    test('Verificando a rota /foods/52771/in-progress', () => {
      jest.spyOn(global, "fetch").mockImplementation(mockFetch)  
        const { history } = renderWithRouter(<App />, ['/foods/52771/in-progress']);
        expect(history.location.pathname).toBe('/foods/52771/in-progress')    
    });
    test('Testa a apresença dos elementos na página', async () => {
      jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
        renderWithRouter(<App />, ['/foods/52771/in-progress']);

        const recipeFoto = await screen.findByTestId('recipe-photo')
        const title =  await screen.findByTestId('recipe-title')
        const ingreD0 = await screen.findByTestId('0-ingredient-step')
        const ingreD1 = await screen.findByTestId('1-ingredient-step')

        const intrucao = screen.getByTestId('instructions')
        const finishRecipe = await screen.findByTestId('finish-recipe-btn');
        expect(ingreD0).toBeInTheDocument()
        expect(ingreD1).toBeInTheDocument()

        expect(recipeFoto).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(intrucao).toBeInTheDocument()     
        expect(finishRecipe).toBeInTheDocument() 
    })
    test('testando a função de desfavoritar uma food', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalFood))

        renderWithRouter(<App />, ['/foods/52771/in-progress']);
        jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(1)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(0)
    });
    test('testando a função de favoritar food', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
        renderWithRouter(<App />, ['/foods/52771/in-progress']);
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(0)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(1)
    });
    test('testando a função checkbox', async () => {
        // localStorage.setItem('favoriteRecipes', JSON.stringify([]))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
       const {history} = renderWithRouter(<App />, ['/foods/52771/in-progress']);  
        const btnFinish = await screen.findByRole('button', {  name: /finish recipe/i})
        const allCheckBox = await screen.findAllByRole('checkbox')    
        expect(allCheckBox).toHaveLength(8)
        allCheckBox.forEach(elemento => {
          userEvent.click(elemento)
          expect(elemento).toHaveProperty('checked', true)
        })
        const progressRecipeAll = JSON.parse(localStorage.getItem('inProgressRecipes'))
        expect(progressRecipeAll.meals['52771']).toHaveLength(8)
      const verificaCheckAll = progressRecipeAll.meals['52771'].every(elemento => elemento.checked === true)
      expect(verificaCheckAll).toBe(true)
        userEvent.click(allCheckBox[1])
        const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
        const verificaCheck = progressRecipe.meals['52771'].every(elemento => elemento.checked === true)
        expect(verificaCheck).toBe(false)

        expect(btnFinish).toBeDisabled()
        userEvent.click(allCheckBox[1])
        expect(btnFinish).toBeEnabled()
        userEvent.click(btnFinish)
        expect(history.location.pathname).toBe('/done-recipes')
        expect(screen.getByRole('heading', {  name: /done recipes/i})).toBeInTheDocument()
      // const ingreD1 = screen.getByRole('checkbox', {  name: /penne rigate 1 pound/i})
      // const ingreD2 = screen.getByRole('checkbox', {  name: /olive oil 1\/4 cup/i})
    });
    test('testando se todos os checkbox iniciando com checked', async () => {
        localStorage.setItem('inProgressRecipes', JSON.stringify(mockTestCheckBox))
        localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalFood))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
       const {history} = renderWithRouter(<App />, ['/foods/52771/in-progress']);  
       const allCheckBox = await screen.findAllByRole('checkbox')  
       expect(allCheckBox).toHaveLength(8)
       allCheckBox.forEach(elemento => {
         expect(elemento).toHaveProperty('checked', true)
       })
    });
    test('testando a função de compartilhar', async () => {
        // localStorage.setItem('inProgressRecipes', JSON.stringify(mockTestCheckBox))
        // localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalFood))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
       const {history} = renderWithRouter(<App />, ['/foods/52771/in-progress']);  
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
    

})