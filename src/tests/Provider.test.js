import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
// import aquamarine from './mocks/mockDrinkIdAquamarine'
// import {fetchDrinksId} from '../fetch/fetchSearchRecipes'
import mockFetch from '../../cypress/mocks/fetch'
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

describe('Provider', () => {
  afterEach(() => global.fetch.mockRestore())

  test('Verificando o botao All, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByTestId('Beef-category-filter')
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /beef and mustard pie/i})
    const card2 = await screen.findByRole('img', {  name: /beef and oyster pie/i})
    const card3 = await screen.findByRole('img', {  name: /beef banh mi bowls with sriracha mayo, carrot & pickled cucumber/i})
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()
    
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    


    const btnAll = await screen.findByTestId('All-category-filter')
    userEvent.click(btnAll)

    const card1All = await screen.findByRole('img', {  name: /corba/i})
    const card13All = await screen.findByRole('img', {  name: /kumpir/i})
    const card111All = await screen.findByRole('img', {  name: /big mac/i})

    expect(await screen.findAllByRole('img')).toHaveLength(16)

  })


  test('Verificando o botao bife, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByTestId('Beef-category-filter')
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /beef and mustard pie/i})
    const card2 = await screen.findByRole('img', {  name: /beef and oyster pie/i})
    const card3 = await screen.findByRole('img', {  name: /beef banh mi bowls with sriracha mayo, carrot & pickled cucumber/i})
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()
    
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    

  })
  test('Verificando o botao breakfast, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByRole('button', {  name: /breakfast/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /breakfast potatoes/i})
    const card2 = await screen.findByTestId('1-card-img')
    expect(card2).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/utxryw1511721587.jpg')
    const card3 = await screen.findByRole('img', { name: /fruit and cream cheese breakfast pastries/i })
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()

    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")

  })
  test('Verificando o botao chicken, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByRole('button', {  name: /chicken/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /chicken & mushroom hotpot/i})
    const card2 = await screen.findByRole('img', {  name: /brown stew chicken/i})
    const card3 = await screen.findByRole('img', {  name: /chick\-fil\-a sandwich/i})
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()

    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")

  })
  test('Verificando o botao Dessert, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByTestId('Dessert-category-filter')
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)
    const card2 = await screen.findByRole('img', {  name: /apple & blackberry crumble/i})
    const card3 = await screen.findByRole('img', {  name: /apple frangipan tart/i})
    const card4 = await screen.findByRole('img', {  name: /bakewell tart/i})
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()
    expect(card4).toBeInTheDocument()

    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")

  })
  test('Verificando o botao Goat, page food', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/foods']);
   const btnfilter = await screen.findByTestId('Goat-category-filter')
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {
      name: /mbuzi choma \(roasted goat\)/i
    })   
    expect(card1).toBeInTheDocument()
    expect(await screen.findAllByRole('img')).toHaveLength(5)
    
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    

  })

  test('Verificando o botao ordinary All, page drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/drinks']);
   const btnfilter = await screen.findByRole('button', {  name: /ordinary drink/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /3\-mile long island iced tea/i})  
    const card2 = await screen.findByRole('img', { name: /410 gone/i })  
    const card3 = await screen.findByRole('img', { name: /50\/50/i })  
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()  

    const allBtn = await screen.findByRole('button', {  name: /all/i})
    userEvent.click(allBtn)

    const img1 = await screen.findByRole('img', {  name: /gg/i})
    const img2 = await screen.findByRole('img', {  name: /a1/i})
    const img3 = await screen.findByRole('img', {  name: /abc/i})

    expect(img1).toBeInTheDocument()
    expect(img2).toBeInTheDocument()
    expect(img3).toBeInTheDocument()

  })

  test('Verificando o botao ordinary Drink, page drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/drinks']);
   const btnfilter = await screen.findByRole('button', {  name: /ordinary drink/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {  name: /3\-mile long island iced tea/i})  
    const card2 = await screen.findByRole('img', { name: /410 gone/i })  
    const card3 = await screen.findByRole('img', { name: /50\/50/i })  
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()  

  })
  test('Verificando o botao cocktail, page drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/drinks']);
   const btnfilter = await screen.findByRole('button', {  name: /cocktail/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', { name: /155 belmont/i }) 
    const card2 = await screen.findByRole('img', { name: /57 chevy with a white license plate/i })
    const card3 = await screen.findByRole('img', { name: /747 drink/i })
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()  

  })
  test('Verificando o botao shake, page drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/drinks']);
   const btnfilter = await screen.findByRole('button', { name: /shake/i })
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', {
      name: /151 florida bushwacker/i
    })
    const card2 = await screen.findByRole('img', {
      name: /avalanche/i
    })
    const card3 = await screen.findByRole('img', {
      name: /baby eskimo/i
    })
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()  

  })
  test('Verificando o botao shake, page drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    renderWithRouter(<App />, ['/drinks']);
   const btnfilter = await screen.findByRole('button', { name: /cocoa/i })
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const card1 = await screen.findByRole('img', { name: /castillian hot chocolate/i })
    const card2 = await screen.findByRole('img', { name: /chocolate beverage/i })
    const card3 = await screen.findByRole('img', { name: /chocolate drink/i })
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
    expect(card3).toBeInTheDocument()
    // expect(await screen.findAllByRole('img')).toHaveLength(5)   

  })
  test('Verificando ao achar 1 item se vai para pagina de detalhes', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
    const {history} = renderWithRouter(<App />, ['/foods']);
    const btnfilter =  screen.getByRole('img', {  name: /search/i})
    expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const inputText = screen.getByRole('textbox')
    userEvent.type(inputText, 'Arrabiata')

    const inputRadioName = screen.getByRole('radio', {  name: /name/i})
    userEvent.click(inputRadioName)

    const inputSearch = screen.getByTestId('exec-search-btn')

    userEvent.click(inputSearch)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771')
    })
  

  })
  test('Verificando ao achar 1 item se vai para pagina de detalhes, drinks', async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch)   
   const {history} = renderWithRouter(<App />, ['/drinks']);
   const btnfilter =  screen.getByRole('img', {  name: /search/i})
   expect(btnfilter).toBeInTheDocument()
    userEvent.click(btnfilter)

    const inputText = screen.getByRole('textbox')
    userEvent.type(inputText, 'Aquamarine')

    const inputRadioName = screen.getByRole('radio', {  name: /name/i})
    userEvent.click(inputRadioName)

    const inputSearch = screen.getByTestId('exec-search-btn')

    userEvent.click(inputSearch)
   await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks/178319')
    const titleDrinkPage = screen.getByRole('heading', {  name: /aquamarine/i})
    expect(titleDrinkPage).toBeInTheDocument()
  })
 

  })




})