import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../Context/MyContext';

function Profile() {
  const { user } = useContext(MyContext);
  // const {email} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ;
  // // const { email } = user;
  const history = useHistory();

  const handleClick = (location = '') => {
    history.push(`/${location}`);
  };

  return (
    <>
      <Header title="Profile" isTrue={ false } />
      <div>
        <h3 data-testid="profile-email">{`email: ${user}` || 'email: '}</h3>
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
            localStorage.setItem('mealsToken', '');
            localStorage.setItem('cocktailsToken', '');
            localStorage.setItem('doneRecipes', []);
            localStorage.setItem('favoriteRecipes', []);
            localStorage.setItem('inProgressRecipes', []);
            localStorage.setItem('user', '');
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
