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
      
    }]

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
        expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(1)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
        const recebeLocalStorageSemFavortar = JSON.parse(localStorage.getItem('favoriteRecipes'))     
        expect(recebeLocalStorageSemFavortar).toHaveLength(0)
    });
    test('testando a função de favoritar uma drink', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]))
        jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
        renderWithRouter(<App />, ['/drinks/178319/in-progress']);      
        const inputFavorite = await screen.findByTestId('favorite-btn')
        expect(inputFavorite).toHaveProperty('src', "http://localhost/whiteHeartIcon.svg")
        const recebeLocalStorageFavoritado = JSON.parse(localStorage.getItem('favoriteRecipes'))
        expect(recebeLocalStorageFavoritado).toHaveLength(0)
        userEvent.click(inputFavorite)
        expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")
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
  test('Testa o botão de finalizar', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch) 
    const { history } = renderWithRouter(<App />, ['/drinks/178319/in-progress']);
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toBeDisabled();
    const ingreD0 = await screen.findByRole('checkbox', { name: /hpnotiq 2 oz/i });
    expect(ingreD0).toBeInTheDocument();
    expect(ingreD0).not.toBeChecked();
    const ingreD1 = await screen.findByRole('checkbox', { name: /pineapple juice 1 oz/i })
    expect(ingreD1).toBeInTheDocument();
    expect(ingreD1).not.toBeChecked();
    const ingreD2 = await screen.findByRole('checkbox', { name: /banana liqueur 1 oz/i })
    expect(ingreD2).toBeInTheDocument();
    expect(ingreD1).not.toBeChecked();
    userEvent.click(ingreD0);
    expect(ingreD0).toBeChecked();
    userEvent.click(ingreD1);
    expect(ingreD1).toBeChecked();
    userEvent.click(ingreD2);
    expect(ingreD2).toBeChecked();
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  })
})