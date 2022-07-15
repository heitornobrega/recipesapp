import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, isTrue }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ title}</h1>
      {isTrue && (
        <button type="button" onClick={ () => setDisplayMenu(!displayMenu) }>
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>
      )}
      {displayMenu && <SearchBar />}
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  isTrue: PropTypes.bool.isRequired,
};

export default Header;
