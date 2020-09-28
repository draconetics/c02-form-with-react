import React from 'react';
import logo from '../logo.svg';
import './Menu.css'
import {Link} from 'react-router-dom'

const Menu = () =>{
    return (<>
        <nav>
            <div className="main-nav">
                <div className="App-logo-container">
                    <img src={logo} className="App-logo" alt="App-logo"></img>
                    <h1>CroWenk</h1>
                </div>
                <ul>
                    <li><Link to="/">React redux form</Link></li>
                    <li><Link to="/simple-form">React Simple form</Link></li>
                </ul>
            </div>
            
        </nav>
    </>);
}

export default Menu;