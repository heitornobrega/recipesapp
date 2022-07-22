import React from "react";
import { getAllByAltText, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

const mockLocal = [
    {
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
    },
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

describe('Testando a Pagina FavoriteRecipes', () => {


  test('Verificando a rota /favorite-recipes', () => {
 
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);
    expect(history.location.pathname).toBe('/favorite-recipes')

    const btnAll = screen.getByRole('button', {  name: /all/i})
    const btnFood = screen.getByRole('button', {  name: /food/i})
    const btnDrink = screen.getByRole('button', {  name: /drinks/i})

    expect(btnAll).toBeInTheDocument()
    expect(btnFood).toBeInTheDocument()
    expect(btnDrink).toBeInTheDocument()

    const headerTitle = screen.getByRole('heading', {  name: /favorite recipes/i})
    expect(headerTitle).toBeInTheDocument()

  });
  test('Verificando a lista de favorito', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);

    const img1 = screen.getByTestId('0-horizontal-image')
    const nameRecipe = screen.getByRole('heading', {  name: /spicy arrabiata penne/i})
    const categoryENacionality = screen.getByText(/italian \- vegetarian/i)

    expect(img1).toBeInTheDocument()
    expect(nameRecipe).toBeInTheDocument()
    expect(categoryENacionality).toBeInTheDocument()


    const img2 = screen.getByTestId('1-horizontal-image')
    const nameRecipe2 = screen.getByText(/alcoholic \- cocktail/i)
    const categoryENacionality2 = screen.getByRole('heading', {  name: /aquamarine/i})
  });

  test('Testando btnFood btnDrink e btnAll', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);

    const img1 = screen.getByTestId('0-horizontal-image')
    let img2 = screen.getByTestId('1-horizontal-image')

    expect(screen.getAllByRole('img')).toHaveLength(3)

    const btnFood = screen.getByRole('button', {  name: /food/i})
    userEvent.click(btnFood)
    img2 = screen.queryByTestId('1-horizontal-image')
    expect(img2).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)


    const btnAll = screen.getByRole('button', {  name: /all/i})
    userEvent.click(btnAll)
    expect(screen.getAllByRole('img')).toHaveLength(3)

    const btnDrink = screen.getByRole('button', {  name: /drinks/i})
    userEvent.click(btnDrink)
    expect(screen.getAllByRole('img')).toHaveLength(2)
  });
  test('Testando btnFood btnDrink e btnAll', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);    

    expect(screen.getAllByRole('img')).toHaveLength(3)

    const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn')
    userEvent.click(btnFavorite)
    expect(screen.getAllByRole('img')).toHaveLength(2)

  });
  test('Testando o botao de compartilhar', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal))
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);    

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const shareBtn = screen.getByTestId('0-horizontal-share-btn')

    userEvent.click(shareBtn)


    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
    const textAppear = screen.getByText(/Link copied/i);
    expect(textAppear).toBeInTheDocument();
    
    const allBtnFavorite = screen.getAllByAltText('favorite')
    userEvent.click(allBtnFavorite[0])
    const allItensLocal = localStorage.getItem('favoriteRecipes')
    expect(JSON.parse(allItensLocal)).toHaveLength(1)

  });


 

});