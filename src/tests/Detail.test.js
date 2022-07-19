import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import aquamarine from './mocks/mockDrinkIdAquamarine'
import {fetchDrinksId} from '../fetch/fetchSearchRecipes'
import mockFetch from '../../cypress/mocks/fetch'
import arrabiata from './mocks/mockMealSpicyArrabiata'

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

describe('testando componenteDetail', () => {

  test('testando a pagina drinks com id 178319', async () => {
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)
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
  test('testando a pagina foods com id 52771', async () => {
    const {history} = renderWithRouter(<App />, ['/foods/52771']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

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
  // test('testando se ao renderizar a pagina ja esta favoritado', async () => {
  //   const {history} = renderWithRouter(<App />, ['/foods/52771']);
  //   localStorage.setItem('favoriteRecipes', mockLocal)
  //   jest.spyOn(global, "fetch").mockImplementation(mockFetch)   

  //   const inputFavorite = await screen.findByTestId('favorite-btn')
   
  //   userEvent.click(inputFavorite)
  //   expect(inputFavorite).toHaveProperty('src', "http://localhost/blackHeartIcon.svg")

  //   // userEvent.click(inputCompartilhar)
  //   // expect(screen.getByText(/Link Codied/))
  // });


})