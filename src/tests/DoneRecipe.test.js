import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

const data = [{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry']
}]

describe('all tests from DoneRecipe page', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

  beforeEach(()=> {
    window.localStorage.setItem('doneRecipes', JSON.stringify(data))
    renderWithRouter(<App />, ['/done-recipes']);
  })

  test('if the elements are in the page', () => {
    const allBtn = screen.getByTestId('filter-by-all-btn')
    const foodBtn = screen.getByTestId('filter-by-food-btn')
    const drinkBtn = screen.getByTestId('filter-by-drink-btn')
    // const image = screen.getByTestId('0-horizontal-image')
    // const text = screen.getByTestId('0-horizontal-top-text')
    // const name = screen.getByTestId('0-horizontal-name')
    // const date = screen.getByTestId('0-horizontal-done-date')
    // const shareBtn = screen.getByTestId('0-horizontal-share-btn')
    // const tags = screen.getByTestId('0-Pasta-horizontal-tag')

    expect(allBtn).toBeInTheDocument()
    expect(foodBtn).toBeInTheDocument()
    expect(drinkBtn).toBeInTheDocument()
    // expect(image).toBeInTheDocument()
    // expect(text).toBeInTheDocument()
    // expect(name).toBeInTheDocument()
    // expect(date).toBeInTheDocument()
    // expect(shareBtn).toBeInTheDocument()
    // expect(tags).toBeInTheDocument()
  });

});