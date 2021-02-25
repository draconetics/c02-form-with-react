/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  required, maxLength15, number, minValue18, email, tooOld, aol,
} from './util';

const renderField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const doSubmit = (values) => {
  console.log(values);
  alert(JSON.stringify(values));
};

const FieldLevelValidationForm = ({
  handleSubmit, pristine, reset, submitting,
}) => (
  <form onSubmit={handleSubmit(doSubmit)}>
    <Field
      name="username"
      type="text"
      component={renderField}
      label="Username"
      validate={[required, maxLength15]}
    />
    <Field
      name="email"
      type="email"
      component={renderField}
      label="Email"
      validate={[email, required]}
      warn={aol}
    />
    <Field
      name="age"
      type="number"
      component={renderField}
      label="Age"
      validate={[required, number, minValue18]}
      warn={tooOld}
    />
    <div>
      <button type="submit" disabled={submitting}>Submit</button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>
);

export default reduxForm({
  form: 'fieldLevelValidation', // a unique identifier for this form
})(FieldLevelValidationForm);
