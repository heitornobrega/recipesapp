import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import renderWithRouter from "./helpers/renderWithRouter";
describe("Header", () => {
  test("testa componentes", () => {
    const { history } = renderWithRouter(<App />, ["/foods"]);
    const topSearchbtn = screen.getByTestId("search-top-btn");
    const topProfileBtn = screen.getByTestId("profile-top-btn");
    const pageTitle = screen.getByTestId("page-title");
    let inputTextSearchBar = screen.queryByTestId('search-input');
    expect(inputTextSearchBar).not.toBeInTheDocument();
    expect(topSearchbtn).toBeInTheDocument();
    expect(topProfileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    userEvent.click(topSearchbtn);
    inputTextSearchBar = screen.queryByTestId('search-input');
    expect(inputTextSearchBar).toBeInTheDocument();
  });
});
