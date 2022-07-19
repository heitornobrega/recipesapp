import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import aquamarine from './mocks/mockDrinkIdAquamarine'
import {fetchDrinksId} from '../fetch/fetchSearchRecipes'
import mockFetch from '../../cypress/mocks/fetch'

describe('testando Search /drinks/178319', () => {

  test('testando a pagina com o id especifico', async () => {
    const {history} = renderWithRouter(<App />, ['/drinks/178319']);
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)
    // jest.spyOn(global, "fetch").mockImplementation(() =>
    // Promise.resolve({
    //   json: ()  => Promise.resolve(aquamarine)
    // }))
    // console.log(history);


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
  });


})