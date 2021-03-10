/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { validate, validateEmail } from '../../components/util';

import './ManualForm.css';

const FA = require('react-fontawesome');

const ManualForm = () => {
  const inputInit = { value: '', touched: false, error: null };
  const [username, setUsername] = useState(inputInit);
  const [firstName, setFirstName] = useState(inputInit);
  const [lastName, setLastName] = useState(inputInit);
  const [email, setEmail] = useState(inputInit);
  const [password01, setPassword01] = useState(inputInit);
  const [password02, setPassword02] = useState(inputInit);
  const [captcha, setCaptcha] = useState(null);
  const [errorList, setErrorList] = useState([]);

  const handleOnChange = (e) => {
    let error = '';
    console.log(e.target.value, e.target.value.length);
    const inputName = e.target.name;
    const inputValue = e.target.value;
    switch (inputName) {
      case 'username':
        error = validate('username', inputValue, 10, 3);
        setUsername({ ...username, value: inputValue, error });
        break;
      case 'firstName':
        error = validate('firstname', inputValue, 10, 3);
        setFirstName({ ...firstName, value: inputValue, error });
        break;
      case 'lastName':
        error = validate('lastname', inputValue, 10, 3);
        setLastName({ ...lastName, value: inputValue, error });
        break;
      case 'email':
        error = validateEmail(inputValue);
        setEmail({ ...email, value: inputValue, error });
        break;
      case 'password01':
        error = validate('password', inputValue, 20, 5);
        setPassword01({ ...password01, value: inputValue, error });
        break;
      case 'password02': {
        error = validate('password', inputValue, 20, 5);
        if (error === '') {
          error = (password01.value === inputValue) ? '' : 'Passwords do not match';
        }
        setPassword02({ ...password02, value: inputValue, error });
        break;
      }
      default:
    }
  };

  const onBlur = (e) => {
    switch (e.target.name) {
      case 'username':
        setUsername({ ...username, touched: true });
        break;
      case 'firstName':
        setFirstName({ ...firstName, touched: true });
        break;
      case 'lastName':
        setLastName({ ...lastName, touched: true });
        break;
      case 'email':
        setEmail({ ...email, touched: true });
        break;
      default:
    }
  };

  const getMessage = (inputName) => {
    if (inputName.error != null && inputName.error.length > 0) {
      return <FA className="times-icon" name="times" />;
    }
    if (inputName.error === '') {
      return (
        <span className="text-success">
          <FA className="check-icon" name="check" />
        </span>
      );
    }
    if (inputName.touched) {
      return <span className="text-danger">Required</span>;
    }
    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit!!');
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    const list = [
      username.error,
      firstName.error,
      lastName.error,
      email.error,
      password01.error,
      password02.error,
    ];
    if (!username.value.trim()) list[0] = 'Username required';
    if (!firstName.value.trim()) list[1] = 'firstname required';
    if (!lastName.value.trim()) list[2] = 'lastname required';
    if (!email.value.trim()) list[3] = 'email required';
    if (!password01.value.trim()) list[4] = 'Password required';
    if (!password02.value.trim()) list[5] = 'Repeat password';
    if (captcha === null) list.push('I am a robot');
    console.log(list);
    if (list[0] || list[1] || list[2]
      || list[3] || list[4] || list[5]
      || list[6]) {
      setErrorList(list);
      return;
    }
    console.log(list);
    console.log(username);
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password01);
    console.log(password02);
    const data = `${username.value},${firstName.value},${lastName.value},${email.value},${password01.value}`;
    alert(data);
  };

  const onChange = (value) => {
    setCaptcha(value);
  };

  return (
    <div>
      <form className="manual-form-register" onSubmit={(e) => onSubmit(e)}>
        <CustomInput
          label="Username"
          type="text"
          name="username"
          inputValue={username}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <CustomInput
          label="First Name"
          type="text"
          name="firstName"
          inputValue={firstName}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <CustomInput
          label="Last Name"
          type="text"
          name="lastName"
          inputValue={lastName}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <CustomInput
          label="Email"
          type="email"
          name="email"
          inputValue={email}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <CustomInput
          label="Password"
          type="password"
          name="password01"
          inputValue={password01}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <CustomInput
          label="Repeat password"
          type="password"
          name="password02"
          inputValue={password02}
          handleOnChange={handleOnChange}
          onBlur={onBlur}
          getMessage={getMessage}
        />
        <div className="manual-form-register__captcha">
          <ReCAPTCHA
            sitekey="6LeQy_USAAAAAITw-Z04eI_-GWy5StpO8daa3PRl"
            onChange={onChange}
          />
        </div>
        <div className="message-are">
          {errorList
            && errorList.map((error) => {
              if (error !== '') {
                return (
                  <div
                    key={nanoid()}
                    className="manual-form-register__error"
                  >
                    {error}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div className="form-group">
          <button type="submit" className="manual-form-register__submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

const CustomInput = ({
  label, type, name, inputValue, handleOnChange, onBlur, getMessage,
}) => (
  <div className="form-group">
    <label>
      {label}
      <FA className="info-circle-icon" name="info-circle" />
    </label>
    <input
      type={type}
      name={name}
      value={inputValue.value}
      onChange={(e) => handleOnChange(e)}
      onBlur={(e) => onBlur(e)}
      autoComplete="off"
    />
    <div>{getMessage(inputValue)}</div>
  </div>
);

const input = {
  value: PropTypes.string.isRequired,
};
CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputValue: PropTypes.arrayOf(PropTypes.shape(input)).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};

export default ManualForm;
