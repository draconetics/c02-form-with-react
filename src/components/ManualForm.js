/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const FA = require('react-fontawesome');

const ManualForm = () => {
  const inputInit = { value: '', touched: false, error: null };
  const [firstName, setFirstName] = useState(inputInit);
  const [lastName, setLastName] = useState(inputInit);
  const [email, setEmail] = useState(inputInit);

  const reset = () => {
    setFirstName(inputInit);
    setLastName(inputInit);
    setEmail(inputInit);
  };

  const validateName = (firstNameInput) => {
    if (firstNameInput.length <= 3) {
      return 'First Name should be > 3 characters';
    }
    if (firstNameInput.length > 10) {
      return 'First Name should be <= 10 characters';
    }
    return '';
  };

  const validateLastName = (lastNameInput) => {
    if (lastNameInput.length < 3) {
      return 'Last Name should be >= 3 characters';
    }
    if (lastNameInput.length > 10) {
      return 'Last Name should be <= 10 characters';
    }

    return '';
  };
  const emailIsValid = (emailValue) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue);
  const validateEmail = (emailInput) => {
    if (emailInput.length === 0) {
      console.log('return *');
      return '(*)';
    }
    if (!emailIsValid(emailInput)) {
      return 'Email is not valid';
    }
    return '';
  };

  const handleOnChange = (e) => {
    let error = '';
    // console.log(e.target.value, e.target.value.length);
    const inputName = e.target.name;
    const inputValue = e.target.value;
    switch (inputName) {
      case 'firstName':
        error = validateName(inputValue);
        setFirstName({ ...firstName, value: inputValue, error });
        break;
      case 'lastName':
        error = validateLastName(inputValue);
        setLastName({ ...lastName, value: inputValue, error });
        break;
      case 'email':
        error = validateEmail(inputValue);
        setEmail({ ...email, value: inputValue, error });
        break;
      default:
    }
  };

  const onBlur = (e) => {
    switch (e.target.name) {
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

  const verifyForm = () => (firstName.error === '' && lastName.error === '' && email.error === ''
    ? ''
    : 'disabled');

  const getMessage = (inputName) => {
    if (inputName.error != null && inputName.error.length > 0) {
      return <span className="text-danger">{`->${inputName.error}`}</span>;
    }
    if (inputName.error === '') {
      return (
        <span className="text-success">
          {'->Correct!'}
          <FA className="thumbs-up-icon" name="thumbs-up" />
        </span>
      );
    }
    if (inputName.touched) {
      return <span className="text-danger">(*)</span>;
    }
    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit!!');
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    if (verifyForm() === 'disabled') {
      return;
    }
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    alert({ firstName, lastName, email });
  };

  return (
    <div>
      <form className="form-container" onSubmit={(e) => onSubmit(e)}>
        <h3>Simple Form Validation</h3>
        <div className="form-group">
          <label>
            First Name
            {getMessage(firstName)}
          </label>

          <input
            className="form-control"
            type="text"
            name="firstName"
            value={firstName.value}
            onChange={(e) => handleOnChange(e)}
            placeholder="First Name"
            onBlur={(e) => onBlur(e)}
          />
        </div>
        <div className="form-group">
          <label>
            Last Name
            {getMessage(lastName)}
          </label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={lastName.value}
            onChange={(e) => handleOnChange(e)}
            placeholder="Last Name"
            onBlur={(e) => onBlur(e)}
          />
        </div>
        <div className="form-group">
          <label>
            Email
            {getMessage(email)}
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={email.value}
            onChange={(e) => handleOnChange(e)}
            placeholder="Email"
            onBlur={(e) => onBlur(e)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className={`btn btn--primary ${verifyForm()}`}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualForm;
