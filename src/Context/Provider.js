import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Mycontext from './MyContext';

function Provider({ children }) {
  const [user, setUser] = useState();
  const history = useHistory();

  const handleSubmit = (users) => {
    localStorage.setItem('user', JSON.stringify({ email: users.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUser(users);
    history.push('/foods');
  };

  const context = {
    handleSubmit,
    user,
  };

  return (
    <Mycontext.Provider value={ context }>
      {children}
    </Mycontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
