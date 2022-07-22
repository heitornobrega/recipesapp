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
  tags: ['Pasta', 'Curry'],
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot:  'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '23/06/2020',
  tags: [],
},]

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

    const allBtn1 = screen.getByTestId('filter-by-all-btn')
    const foodBtn1 = screen.getByTestId('filter-by-food-btn')
    const drinkBtn1 = screen.getByTestId('filter-by-drink-btn')
    const image1 = screen.getByTestId('0-horizontal-image')
    const text1 = screen.getByTestId('0-horizontal-top-text')
    const name1 = screen.getByTestId('0-horizontal-name')
    const date1 = screen.getByTestId('0-horizontal-done-date')
    const shareBtn1 = screen.getByTestId('0-horizontal-share-btn')
    const tags1 = screen.getByTestId('0-Pasta-horizontal-tag')

    const allBtn2 = screen.getByTestId('filter-by-all-btn')
    const foodBtn2 = screen.getByTestId('filter-by-food-btn')
    const drinkBtn2 = screen.getByTestId('filter-by-drink-btn')
    const image2 = screen.getByTestId('0-horizontal-image')
    const text2 = screen.getByTestId('0-horizontal-top-text')
    const name2 = screen.getByTestId('0-horizontal-name')
    const date2 = screen.getByTestId('0-horizontal-done-date')
    const shareBtn2 = screen.getByTestId('0-horizontal-share-btn')
    const tags2 = screen.getByTestId('0-Pasta-horizontal-tag')

    expect(allBtn1).toBeInTheDocument()
    expect(foodBtn1).toBeInTheDocument()
    expect(drinkBtn1).toBeInTheDocument()
    expect(image1).toBeInTheDocument()
    expect(text1).toBeInTheDocument()
    expect(name1).toBeInTheDocument()
    expect(date1).toBeInTheDocument()
    expect(shareBtn1).toBeInTheDocument()
    expect(tags1).toBeInTheDocument()

    expect(allBtn2).toBeInTheDocument()
    expect(foodBtn2).toBeInTheDocument()
    expect(drinkBtn2).toBeInTheDocument()
    expect(image2).toBeInTheDocument()
    expect(text2).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(date2).toBeInTheDocument()
    expect(shareBtn2).toBeInTheDocument()
    expect(tags2).toBeInTheDocument()
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