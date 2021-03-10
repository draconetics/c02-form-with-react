import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/MenuComponent/Menu';
import Home from './pages/home/Home';
import RegisterForm from './components/RegisterForm';
import WidgetsForm from './components/WidgetsForm';
import Login from './pages/redux-login-form/Login';
import MainManualForm from './pages/manual-form/MainManualForm';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route path="/login-form" component={Login} />
          <Route path="/manual-form">
            <MainManualForm />
          </Route>
          <Route path="/register-form">
            <RegisterForm />
          </Route>
          <Route path="/widgets-form">
            <WidgetsForm />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
