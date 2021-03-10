/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

import './LoginFormNumber.css';

export default class LoginFormNumber extends React.Component {
  constructor(props) {
    super(props);
    this.default = {
      value: '',
      touch: false,
      error: '',
    };
    this.state = {
      code: this.default,
      phone: this.default,
      password: this.default,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e);
    let error = '';
    const { name, value } = e.target;
    switch (name) {
      case 'code':
        error = (value === null || value === '') ? 'Required Code' : '';
        this.setState((prevState) => ({
          ...prevState,
          code: {
            ...prevState.code, value, touch: true, error,
          },
        }));
        break;
      case 'phone': {
        error = (value && Number.isNaN(Number.parseInt(value, 10))) ? 'insert valid numbers' : '';
        if (value.lenght === 0) {
          error = 'Phone required';
        }
        this.setState((prevState) => ({
          ...prevState,
          phone: {
            ...prevState.phone, value, touch: true, error,
          },
        }));
        break;
      }
      case 'password': {
        if (value.lenght === 0) {
          error = 'Password required';
        }
        this.setState((prevState) => ({
          ...prevState,
          password: {
            ...prevState.password, value, touch: true, error,
          },
        }));
        break;
      }
      default:
    }
  }

  getMessage(inputValue) {
    const { error } = inputValue;
    if (error) {
      return <span className="text-danger">{error}</span>;
    }
    return null;
  }

  sendForm(e) {
    e.preventDefault();
    const { code, phone, password } = this.state;
    let errorCode = '';
    let errorPhone = '';
    let errorPassword = '';
    if (code.value === '' || code.value === null) {
      errorCode = 'Country Code Required';
    }

    if (phone.value === '' || phone.value === null) {
      errorPhone = 'Phone Required';
    }

    if (password.value === '' || password.value === null) {
      errorPassword = 'Password Required';
    }

    this.setState((prevState) => ({
      ...prevState,
      code: { ...prevState.code, error: errorCode },
      phone: { ...prevState.phone, error: errorPhone },
      password: { ...prevState.password, error: errorPassword },
    }));

    if (code.value && phone.value && password.value) {
      alert('form filled correctly...');
    }
  }

  render() {
    const { phone, code, password } = this.state;
    return (
      <form className="login-form-number" onSubmit={(e) => this.sendForm(e)}>
        <p className="login-title">Mobile</p>
        <div className="lfn__number-group">
          <div className="lfn__custom-select">
            <CustomSelect handleChange={this.handleChange} code={code} />
          </div>
          <input
            type="number"
            name="phone"
            value={phone.value}
            onChange={this.handleChange}
            className="login-input"
          />
        </div>
        <div className="login-form-number__message">
          {this.getMessage(code)}
          {this.getMessage(phone)}
        </div>
        <p className="login-title">Password</p>
        <input
          type="password"
          name="password"
          value={password.value}
          onChange={this.handleChange}
          className="login-input"
        />
        <div className="login-form-number__message">
          {this.getMessage(password)}
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    );
  }
}
