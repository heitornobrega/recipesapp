import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch from '../../cypress/mocks/fetch'
import { saveLocalStorage } from "../fetch/localStorageFunc";

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
  const mockTest = [
    {
        "idDrink": "178319",
        "strDrink": "Aquamarine",
        "strDrinkAlternate": null,
        "strTags": null,
        "strVideo": null,
        "strCategory": "Cocktail",
        "strIBA": null,
        "strAlcoholic": "Alcoholic",
        "strGlass": "Martini Glass",
        "strInstructions": "Shake well in a shaker with ice.\r\nStrain in a martini glass.",
        "strInstructionsES": "Agite bien en una coctelera con hielo. Cuela en una copa de Martini.",
        "strInstructionsDE": null,
        "strInstructionsFR": null,
        "strInstructionsIT": "Shakerare bene in uno shaker con ghiaccio.\r\nFiltrare in una coppetta Martini.",
        "strInstructionsZH-HANS": null,
        "strInstructionsZH-HANT": null,
        "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "strIngredient1": "Hpnotiq",
        "strIngredient2": "Pineapple Juice",
        "strIngredient3": "Banana Liqueur",
        "strIngredient4": null,
        "strIngredient5": null,
        "strIngredient6": null,
        "strIngredient7": null,
        "strIngredient8": null,
        "strIngredient9": null,
        "strIngredient10": null,
        "strIngredient11": null,
        "strIngredient12": null,
        "strIngredient13": null,
        "strIngredient14": null,
        "strIngredient15": null,
        "strMeasure1": "2 oz",
        "strMeasure2": "1 oz",
        "strMeasure3": "1 oz",
        "strMeasure4": "",
        "strMeasure5": "",
        "strMeasure6": "",
        "strMeasure7": "",
        "strMeasure8": null,
        "strMeasure9": null,
        "strMeasure10": null,
        "strMeasure11": null,
        "strMeasure12": null,
        "strMeasure13": null,
        "strMeasure14": null,
        "strMeasure15": null,
        "strImageSource": null,
        "strImageAttribution": null,
        "strCreativeCommonsConfirmed": "No",
        "dateModified": null
    }
]

describe('Testa a pagina drink-in-progress', () => {
    // afterEach(() => global.fetch.mockRestore())
    test('Verificando a rota /drinks/17203/in-progress', () => {
        const { history } = renderWithRouter(<App />, ['/drinks/17203/in-progress']);
        expect(history.location.pathname).toBe('/drinks/17203/in-progress')    
    });
    test('Testa a apresença dos elementos na página', async () => {
        renderWithRouter(<App />, ['/drinks/17203/in-progress']);
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
    test('testando a função de desfavoritar uma drink', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDrink))
        renderWithRouter(<App />, ['/drinks/178319/in-progress']);
        jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('alt', "blackHeartIcon")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(1)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('alt', "whiteHeartIcon")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(0)
    });
    test('testando a função de favoritar uma drink', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
        renderWithRouter(<App />, ['/drinks/178319/in-progress']);      
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('alt', "whiteHeartIcon")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(0)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('alt', "blackHeartIcon")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(1)
    });
    test('testando clipBoard', async () => {
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
        renderWithRouter(<App />, ['/drinks/178319/in-progress']);    
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