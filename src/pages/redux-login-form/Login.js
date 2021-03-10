/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginFormNumber from './LoginFormNumber';

import './Login.css';

export default function Login(props) {
  const { match } = props;
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h3>Log In</h3>
          <p>Please check that you are visiting the correct URL</p>
          <div className="login__url">
            <span>https://</span>
            accounts.binance.com
          </div>
        </div>
        <ul className="login__submenu">
          <li><NavLink exact activeClassName="active" to="/login-form">Login</NavLink></li>
          <li><NavLink exact activeClassName="active" to="/login-form/number">Number</NavLink></li>
        </ul>
        <Switch>
          <Route path={match.url} exact component={LoginForm} />
          <Route exact path={`${match.url}/number`} component={LoginFormNumber} />
        </Switch>
        <div className="login__links">
          <a href="#">Forgot Password?</a>
          <a href="#">Scan to login</a>
          <a href="#">Free registration</a>
        </div>
      </div>
      <p className="login__clone">
        clone of :
        <a target="_target" href="https://accounts.binance.com/en/login?callback=">accounts.binance.com</a>
      </p>
    </div>
  );
}

const urlItem = {
  url: PropTypes.string.isRequired,
};
Login.propTypes = {
  match: PropTypes.shape(urlItem).isRequired,
};
