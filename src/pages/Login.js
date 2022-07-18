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
    // verifica();
  };

  return (
    <form onSubmit={ () => handleSubmit(user) }>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disable }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
