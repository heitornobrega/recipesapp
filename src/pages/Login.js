import React, { useState, useContext, useEffect } from 'react';
import Mycontext from '../Context/MyContext';

function Login() {
  const { handleSubmit } = useContext(Mycontext);
  const [user, setUser] = useState({ email: '', password: '' });
  const [disable, setDisable] = useState(true);

  const verifica = () => {
    const seis = 6;
    const { email, password } = user;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (validEmail && password.length > seis) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    verifica();
  }, [user.password, user.email]);

  const handleChange = ({ target: { value, name } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <section className="container">
      <div className="login-container">
        <span className="imgHeader">
          <img src="https://i.pinimg.com/originals/07/3e/55/073e55a7924f96e0bd855614ca1b0746.png" alt="" />
        </span>
        <h1>Login</h1>
        <form onSubmit={ () => handleSubmit(user) }>
          <label htmlFor="email">
            <input
              className="input-content"
              type="email"
              name="email"
              id="email"
              onChange={ handleChange }
              data-testid="email-input"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              className="input-content"
              type="password"
              name="password"
              id="password"
              onChange={ handleChange }
              data-testid="password-input"
              placeholder="Senha"
            />
          </label>
          <button
            className={ disable ? 'button-login-disable' : 'button-login' }
            type="submit"
            data-testid="login-submit-btn"
            disabled={ disable }
          >
            Enter

          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
