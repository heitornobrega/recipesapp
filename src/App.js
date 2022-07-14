import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorite from './pages/Favorite';
//

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ Done } />
          <Route path="/favorite-recipes" component={ Favorite } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
