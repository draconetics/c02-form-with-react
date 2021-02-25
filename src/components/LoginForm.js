/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import './LoginForm.css';

const FA = require('react-fontawesome');

const validate = ({ email, password }) => {
  const error = {};
  if (!email || email.trim() === '') {
    error.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error.email = 'Please enter a correct email address';
  }
  if (!password || password.trim() === '') {
    error.password = 'Please enter your password';
  }
  return error;
};

const emptyError = (error) => Object.keys(error).length === 0;
const doSubmit = (values) => {
  const error = validate(values);
  if (emptyError(error)) {
    console.log(JSON.stringify(error));
    alert(JSON.stringify(values));
  } else {
    throw new SubmissionError(error);
  }
};

const getMessage = (touched, error) => {
  if (touched && error) {
    return <span className="text-danger">{error}</span>;
  }
  return '';
};

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <>
    <label className="control-label">
      {label}
    </label>
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...input}
      type={type}
      className={(error) ? 'form-input danger' : 'form-input'}
    />
    {getMessage(touched, error)}
  </>
);

// eslint-disable-next-line import/no-mutable-exports
let LoginForm = ({
  handleSubmit, pristine, invalid,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const showPasswordIcon = () => {
    if (showPassword) {
      return <FA className="eye-icon" name="eye" />;
    }
    return <FA className="eye-slash-icon" name="eye-slash" />;
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(doSubmit)}>
      <div className="form-group">
        <Field name="email" component={renderField} label="Email" type="text" />
      </div>
      <div className="form-group">
        <Field name="password" component={renderField} label="Password" type={showPassword ? 'text' : 'password'} />
        <a href="#" className="eye-link" onClick={() => togglePassword()}>
          {showPasswordIcon()}
        </a>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn--primary">
          Log In
        </button>
      </div>
    </form>
  );
};
LoginForm = reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);

export default LoginForm;
