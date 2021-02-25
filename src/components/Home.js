import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppStore, faBitcoin } from '@fortawesome/free-brands-svg-icons';

import './Home.css';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home container">
        <h1>List of Forms</h1>
        <ul>
          <li>
            <FontAwesomeIcon icon={faBitcoin} />
            <Link to="/login-form">Redux login form</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBitcoin} />
            <Link to="/manual-form">React Manual form</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBitcoin} />
            <Link to="/register-form">Redux register form</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBitcoin} />
            <Link to="/field-level-form">Field Level form</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBitcoin} />
            <Link to="/widgets-form">Widgets form</Link>
          </li>
        </ul>
      </div>
    );
  }
}
