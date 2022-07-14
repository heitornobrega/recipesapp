import React from "react";
import {render, screen, } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history'

describe('Login',()=> {
  test('', () => {
  render(<App/>)
  const history = createMemoryHistory()
  const bntSubmit = screen.getByTestId('login-submit-btn')
  const inputPass = screen.getByTestId('password-input')
  const inputEmail = screen.getByTestId('email-input')
    expect(inputEmail).toBeInTheDocument()
    expect(inputPass).toBeInTheDocument()
    expect(bntSubmit).toBeInTheDocument()
    expect(bntSubmit).toHaveProperty('disabled', true)
    userEvent.type(inputEmail, '123@hotmail.com')
    userEvent.type(inputPass,'1234567')
    expect(bntSubmit).toHaveProperty('disabled', false)
    userEvent.click(bntSubmit)
    history.push('/foods')
    const {location} = history
    expect(location.pathname).toBe('/foods')


  })
})