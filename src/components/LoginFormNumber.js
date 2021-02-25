import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import data from './data';

import 'react-phone-input-2/lib/style.css';
import './LoginFormNumber.css';
import CustomSelect from './CustomSelect';

// const URL = "https://purecatamphetamine.github.io/country-flag-icons/3x2/BO.svg"
// const URL = 'https://purecatamphetamine.github.io/country-flag-icons/3x2/';
const URL = './svgs/';
/* const options = [
  {
    value: 'chocolate',
    label: (
      <div>
        <img src={`${URL}BO.svg`} height="20px" width="20px" />
        Chocolate{' '}
      </div>
    ),
  },
  {
    value: 'strawberry',
    label: (
      <div>
        <img src={`${URL}CA.svg`} height="20px" width="20px" />
        strawberry{' '}
      </div>
    ),
  },
  {
    value: 'vainilla',
    label: (
      <div>
        <img src={`${URL}US.svg`} height="20px" width="20px" />
        vainilla{' '}
      </div>
    ),
  },
]; */

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
      /* console.log(`${key}: ${value}`); */
      const item = {
        value: value.name + value.code,
        label: (
          <div style={style}>
            <img src={`${URL + key}.svg`} style={imageStyle} />
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
    this.setState({
      ...this.state,
      phone,
    });
  }

  render() {
    const { phone, selectedOption, options } = this.state;
    return (
      <form className="login-form-number">
        <p>this is number</p>
        <PhoneInput
          country="us"
          value={phone}
          onChange={this.changePhone}
          enableSearch="true"
          required="true"
          /*           buttonStyle={{ backgroundColor: 'white' }} */
          /* dropdownStyle={{ height: '50px', backgroundColor: 'black' }} */
        />
        <Select
          defaultValue={selectedOption}
          onChange={this.setSelectedOption}
          options={options}
          isSearchable="true"
          isClearable="true"
        />
        <CustomSelect />
      </form>
    );
  }
}
