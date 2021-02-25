import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => (
  <>
    <nav>
      <div className="main-nav container">
        <div className="App-logo-container">
          <img src="./n.gif" className="App-logo" alt="App-logo" />
          <h1>CroWenk</h1>
        </div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/manual-form">React Simple form</Link></li>
        </ul>
      </div>

    </nav>
  </>
);

export default Menu;
