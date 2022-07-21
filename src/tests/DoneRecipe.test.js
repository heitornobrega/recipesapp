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

  function beforeTests(route) {
    window.localStorage.setItem('doneRecipes', JSON.stringify(data))
    const { history } = renderWithRouter(<App
    id={ data.id }
    type={ data.type }
    nationality={ data.nationality }
    category={ data.category }
    alcoholicOrNot={ data.alcoholicOrNot }
    name={ data.name }
    image={ data.image }
    doneDate={ data.doneDate }
    tags={ data.tags }
    
    />, [route]);
  }

  test('the page without any done recipe', () => {
    renderWithRouter(<App />, ['/done-recipes'])

    const textWithoutRecipe = screen.getByText(/nenhuma receita/i)

    expect(textWithoutRecipe).toBeInTheDocument()

  });

  test('if the elements are in the page', () => {
    beforeTests('/done-recipes')

    const allBtn = screen.getByTestId('filter-by-all-btn')
    const foodBtn = screen.getByTestId('filter-by-food-btn')
    const drinkBtn = screen.getByTestId('filter-by-drink-btn')
    const image = screen.getByTestId('0-horizontal-image')
    const text = screen.getByTestId('0-horizontal-top-text')
    const name = screen.getByTestId('0-horizontal-name')
    const date = screen.getByTestId('0-horizontal-done-date')
    const shareBtn = screen.getByTestId('0-horizontal-share-btn')
    const tags = screen.getByTestId('0-Pasta-horizontal-tag')

    expect(allBtn).toBeInTheDocument()
    expect(foodBtn).toBeInTheDocument()
    expect(drinkBtn).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(shareBtn).toBeInTheDocument()
    expect(tags).toBeInTheDocument()
  });

  test('if the elements redirects to other pages', () => {
    const { history } = renderWithRouter(<App
      id={ data.id }
      type={ data.type }
      nationality={ data.nationality }
      category={ data.category }
      alcoholicOrNot={ data.alcoholicOrNot }
      name={ data.name }
      image={ data.image }
      doneDate={ data.doneDate }
      tags={ data.tags }
      
      />, ['/done-recipes'])

    const { location: pathname, } = history
    
    const image = screen.getByTestId('0-horizontal-image')

    userEvent.click(image)

    // expect(pathname.pathname).toBe('/done-recipes')
  });

  test('if the buttons are clickable', () => {
    beforeTests('/done-recipes')

    const allBtn = screen.getByTestId('filter-by-all-btn')
    const foodBtn = screen.getByTestId('filter-by-food-btn')
    const drinkBtn = screen.getByTestId('filter-by-drink-btn')

    userEvent.click(allBtn)
    userEvent.click(foodBtn)
    userEvent.click(drinkBtn)
  });

  test('the button share and clipboard', () => {
    beforeTests('/done-recipes')

    // referência utilizada para testar clipboard: https://cursos.alura.com.br/forum/topico-como-testar-o-que-tem-na-area-de-transferencia-e-um-select-multiplo-150788
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const shareBtn = screen.getByTestId('0-horizontal-share-btn')

    userEvent.click(shareBtn)

    // jest.spyOn(navigator.clipboard, 'writeText');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
    const textAppear = screen.getByText(/Link copied/i);
    expect(textAppear).toBeInTheDocument();
  })

});