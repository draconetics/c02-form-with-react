/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import countryList from 'react-select-country-list';

const validate = ({
  name, email, country, termsAndConditions,
}) => {
  const error = {};
  if (!name || name.trim() === '') {
    error.name = 'Required';
  }

  if (!email || email.trim() === '') {
    error.email = 'Required';
  }

  if (!country || country.trim() === '' || country.trim() === 'Select country') {
    error.country = 'required';
  }

  if (!termsAndConditions) {
    error.termsAndConditions = 'You should accept and check terms and conditions';
  }
  return error;
};

const doSubmit = (values) => {
  console.log(values);
};

// outside your render() method
const renderField = ({
  type, label, input, meta: { touched, error },
}) => (
  <div className="input-row">
    <label>{label}</label>
    <input {...input} type={type} placeholder={label} />
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderSelectField = ({
  input, meta: { touched, error }, children,
}) => (
  <div>
    <label>Country born</label>
    <div>
      <select {...input}>
        {children}
      </select>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderCheckboxField = ({ input, meta: { touched, error } }) => (
  <div style={{ border: touched && error ? '1px solid red' : 'none' }}>
    <label>Terms and conditions</label>
    <input type="checkbox" {...input} />
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const RegisterForm = (props) => {
  const options = useMemo(() => countryList().getData(), []);
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <h3>Register new user</h3>
      <Field label="Name" name="name" component={renderField} type="text" />
      <Field label="Email" name="email" component={renderField} type="email" />
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />
            {' '}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />
            {' '}
            Female
          </label>
        </div>
      </div>
      <Field multi name="country" type="text" component={renderSelectField}>
        <option>Select country</option>
        {options
          && options.map((country) => (
            <option value={country.label} key={`${country.value}-${country.label}`}>
              {`${country.label} - ${country.value}`}
            </option>
          ))}
      </Field>
      <Field
        name="termsAndConditions"
        component={renderCheckboxField}
      />
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'customForm',
  validate,
})(RegisterForm);
