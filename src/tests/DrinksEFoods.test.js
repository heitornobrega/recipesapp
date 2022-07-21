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

  test('testando a pagina drinks com id 178319', async () => {
    const {history} = renderWithRouter(<App />, ['/drinks']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)

    expect(history.location.pathname).toBe('/drinks')

    const img0 = await screen.findByTestId('0-card-img', '', {timeout: 4000})
    userEvent.click(img0)
    expect(history.location.pathname).toBe('/drinks/15997')
  })


  test('testando a pagina drinks com o Alert', async () => {
    window.alert = jest.fn();
    const {history} = renderWithRouter(<App />, ['/drinks']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)

    expect(history.location.pathname).toBe('/drinks')

    const btnSearch = screen.getByTestId('search-top-btn')
    userEvent.click(btnSearch)
    const inputSearch = screen.getByTestId('search-input')
    userEvent.type(inputSearch, 'xablau')
    const inputRadioFirstLetter = screen.getByTestId('first-letter-search-radio')
    userEvent.click(inputRadioFirstLetter)
    const btnExecSearch = screen.getByTestId('exec-search-btn')
    userEvent.click(btnExecSearch)
    expect(window.alert.mock.calls.length).toBe(1)
  })
})