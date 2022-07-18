import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorite from './pages/Favorite';
import DetailsFood from './pages/DetailsFood';
import DrinksDetails from './pages/DrinksFood';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
//

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/foods/:id" component={ DetailsFood } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/drinks/:id" component={ DrinksDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/favorite-recipes" component={ Favorite } />
      </Switch>
    </Provider>
  );
}

export default App;
