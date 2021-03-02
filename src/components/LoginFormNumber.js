/* eslint-disable no-restricted-syntax */
import React from 'react';
import data from './data';
import CustomSelect from './CustomSelect';

import './LoginFormNumber.css';

export default class LoginFormNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      selectedOption: null,
      options: [],
    };
    this.changePhone = this.changePhone.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  componentDidMount() {
    const list = [];
    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    };
    const imageStyle = {
      height: '20px',
      width: '20px',
    };
    const nameStyle = {
      flex: '1',
    };
    for (const [key, value] of Object.entries(data)) {
      const item = {
        value: value.name + value.code,
        label: (
          <div style={style}>
            <img src={`${URL + key}.svg`} alt={value.name} style={imageStyle} />
            <p style={nameStyle}>{`${value.name} ${value.code}`}</p>
          </div>
        ),
      };
      list.push(item);
    }
    this.setState({ ...this.state, options: list });
  }

  setSelectedOption(selectedOption) {
    console.log(selectedOption);
    this.setState({
      ...this.state,
      selectedOption,
    });
  }

  changePhone(phone) {
    this.setState(
      (prev) => ({
        ...prev,
        phone,
      }),
    );
  }

  sendForm(e) {
    e.preventDefault();
    alert('send data');
  }

  render() {
    return (
      <form className="login-form-number" onSubmit={this.sendForm}>
        <p className="login-title">Mobile</p>
        <div className="lfn__number-group">
          <div className="lfn__custom-select">
            <CustomSelect />
          </div>
          <input type="number" className="lfn__input-number login-input" />
        </div>
        <p className="login-title">Password</p>
        <input type="password" className="lfn__input-password login-input" />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    );
  }
}
