import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

describe('all tests from footer component', () => {

  test('if the elements arent in the page', () => {
    renderWithRouter(<App />, ['/']);

    const drinkIcon = screen.queryByTestId('drinks-bottom-btn')
    const foodIcon = screen.queryByTestId('food-bottom-btn')

    expect(drinkIcon).toBeNull()
    expect(foodIcon).toBeNull()
  });

  test('if the elements are in the page', () => {
    renderWithRouter(<App />, ['/foods']);

    const drinkIcon = screen.queryByTestId('drinks-bottom-btn')
    const foodIcon = screen.queryByTestId('food-bottom-btn')

    expect(drinkIcon).toBeIntheDocument()
    expect(foodIcon).toBeIntheDocument()
  });

  test('if the anchors redirect to pages', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);
    const { location } = history;

    const drinkIcon = screen.getByTestId('drinks-bottom-btn')

    userEvent.click(drinkIcon)
    history.push('/drinks')

    expect(location.pathname).toBe('/drinks')
  })
})