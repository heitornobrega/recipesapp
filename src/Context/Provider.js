import React from 'react';
import PropTypes from 'prop-types';
import Mycontext from './MyContext';

function Provider({ children }) {
  return (
    <Mycontext.Provider value="">
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
