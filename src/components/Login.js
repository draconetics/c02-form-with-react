/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import LoginForm from './LoginForm';

import './Login.css';
import LoginFormNumber from './LoginFormNumber';

export default class Login extends Component {
  render() {
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
          <LoginFormNumber />
          <div className="login__links">
            <a href="#">Forgot Password?</a>
            <a href="#">Scan to login</a>
            <a href="#">Free registration</a>
          </div>
        </div>
      </div>
    );
  }
}
