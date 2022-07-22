import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [userEmail] = useState(localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : { email: '' });
  const history = useHistory();

  const handleClick = (location = '') => {
    history.push(`/${location}`);
  };

  return (
    <>
      <Header title="Profile" isTrue={ false } />
      <div>
        <h3 data-testid="profile-email">{`email: ${userEmail.email}`}</h3>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => handleClick('done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => handleClick('favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.removeItem('mealsToken');
            localStorage.removeItem('cocktailsToken');
            localStorage.removeItem('doneRecipes');
            localStorage.removeItem('favoriteRecipes');
            localStorage.removeItem('inProgressRecipes');
            localStorage.removeItem('user');
            handleClick();
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
