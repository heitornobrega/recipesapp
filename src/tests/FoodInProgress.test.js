import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch from '../../cypress/mocks/fetch'
import { saveLocalStorage } from "../fetch/localStorageFunc";

const mockLocalFood = [
<<<<<<< HEAD
    {
        "id": "52804",
        "type": "food",
        "nationality": "Canadian",
        "category": "Miscellaneous",
        "alcoholicOrNot": "",
        "name": "Poutine",
        "image": "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg"
    }
]

describe('Testa a pagina food-in-progress', () => {
    // afterEach(() => global.fetch.mockRestore())
    test('Verificando a rota /foods/52804/in-progress', () => {
        const { history } = renderWithRouter(<App />, ['/foods/52804/in-progress']);
        expect(history.location.pathname).toBe('/foods/52804/in-progress')    
    });
    test('Testa a apresença dos elementos na página', async () => {
        renderWithRouter(<App />, ['/foods/52804/in-progress']);
=======
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
>>>>>>> ae7885f1e6f7ca6679d3013412e1ace50ec19571
        const recipeFoto = await screen.findByTestId('recipe-photo')
        const title =  await screen.findByTestId('recipe-title')
        const ingreD0 = await screen.findByTestId('0-ingredient-step')
        const ingreD1 = await screen.findByTestId('1-ingredient-step')
<<<<<<< HEAD
        const ingreD2 = await screen.findByTestId('2-ingredient-step')
        const ingreD3 = await screen.findByTestId('3-ingredient-step')
=======
>>>>>>> ae7885f1e6f7ca6679d3013412e1ace50ec19571
        const intrucao = screen.getByTestId('instructions')
        const finishRecipe = await screen.findByTestId('finish-recipe-btn');
        expect(ingreD0).toBeInTheDocument()
        expect(ingreD1).toBeInTheDocument()
<<<<<<< HEAD
        expect(ingreD2).toBeInTheDocument()
        expect(ingreD3).toBeInTheDocument()
=======
>>>>>>> ae7885f1e6f7ca6679d3013412e1ace50ec19571
        expect(recipeFoto).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(intrucao).toBeInTheDocument()     
        expect(finishRecipe).toBeInTheDocument() 
    })
    test('testando a função de desfavoritar uma food', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalFood))
<<<<<<< HEAD
        renderWithRouter(<App />, ['/foods/52804/in-progress']);
        jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('alt', "blackHeartIcon")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(1)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('alt', "whiteHeartIcon")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(0)
        localStorage.clear();
        global.fetch.mockRestore()
    });
    // test('testando a função de favoritar uma food', async () => {
    //     // localStorage.setItem('favoriteRecipes', JSON.stringify([]))
    //     jest.spyOn(global, "fetch").mockImplementation(mockFetch)
    //     renderWithRouter(<App />, ['/foods/52804/in-progress']);
    //     const inputFavorite = await screen.findByTestId('favorite-btn')
    //     expect(inputFavorite).toHaveProperty('alt', "whiteHeartIcon")
    //     // const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
    //     // expect(recebeLocalStorageFavoritado).toHaveLength(0)
    //     // localStorage.clear();
    //     // userEvent.click(inputFavorite)
    //     // expect(inputFavorite).toHaveProperty('alt', "blackHeartIcon")
    //     // const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))
    //     // expect(recebeLocalStorageSemFavortar).toHaveLength(1)
    //     global.fetch.mockRestore()
    // });
    test('testando a função de favoritar uma comida', async () => {
        const {history} = renderWithRouter(<App />, ['/foods/52804/in-progress']);
    //    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDrink))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
        // const recebeLocalStorage =  localStorage.getItem('favoriteRecipes')    
        // expect(JSON.parse(recebeLocalStorage)).toHaveLength(2)
      });
    test('testando clipBoard', async () => {
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
        renderWithRouter(<App />, ['/foods/52804/in-progress']);
        
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
  test('Testa o botão de finalizar', async () => {
    // jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
    // const { history } = renderWithRouter(<App />, ['/foods/52804/in-progress']);
    // const finishBtn = await screen.findByTestId('finish-recipe-btn');
    // expect(finishBtn).toBeInTheDocument();
    // expect(finishBtn).toBeDisabled();
    // const ingreD0 = await screen.findByRole('checkbox', {  name: /vegetable oil dash/i});
    // expect(ingreD0).toBeInTheDocument();
    // expect(ingreD0).not.toBeChecked();
    // const ingreD1 = await screen.findByRole('checkbox', { name: /beef gravy 1 can/i })
    // expect(ingreD1).toBeInTheDocument();
    // expect(ingreD1).not.toBeChecked();
    // const ingreD2 = await screen.findByRole('checkbox', { name: /potatoes 5 thin cut/i })
    // expect(ingreD2).toBeInTheDocument();
    // expect(ingreD2).not.toBeChecked();
    // const ingreD3 = await screen.findByRole('checkbox', { name: /cheese curds 2 cups/i })
    // expect(ingreD3).toBeInTheDocument();
    // expect(ingreD3).not.toBeChecked();
    // userEvent.click(ingreD0);
    // expect(ingreD0).toBeChecked();
    // userEvent.click(ingreD1);
    // expect(ingreD1).toBeChecked();
    // userEvent.click(ingreD2);
    // expect(ingreD2).toBeChecked();
    // userEvent.click(ingreD3);
    // expect(ingreD3).toBeChecked();  
    // expect(finishBtn).toBeEnabled();
    // userEvent.click(finishBtn);
    // expect(history.location.pathname).toBe('/done-recipes');
  })
=======
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
    
>>>>>>> ae7885f1e6f7ca6679d3013412e1ace50ec19571
})