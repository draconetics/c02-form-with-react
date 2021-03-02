import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import ManualForm from './components/ManualForm';
import RegisterForm from './components/RegisterForm';
import WidgetsForm from './components/WidgetsForm';
import Login from './components/Login';

import './App.css';
import MainManualForm from './components/MainManualForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
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
