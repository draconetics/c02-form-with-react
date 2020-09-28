// FormCode.js

import React from 'react';
import { Field, reduxForm } from 'redux-form';
var FA = require('react-fontawesome')

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length < 2) {
    errors.firstName = 'Minimum be 2 characters or more'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.lastName) {
      errors.lastName = 'Required'
    } else if (values.lastName.length < 2) {
      errors.lastName = 'Minimum be 2 characters or more'
    }
  return errors
}

const getMessage = (touched,  error)=>{
  if(touched && error)
    return (<span className="text-danger">{`(${error})`}</span>)
  if(touched && error==null)
    return (<span className="text-success" >(Correct!!)<FA className="thumbs-up-icon" name="thumbs-up" /></span>)
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}{getMessage(touched, error)}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        
      </div>
    </div>
  )

let FormCode = props => {
  const { handleSubmit, pristine, invalid, values, reset } = props;
  return (
    
    <form className="form-container" onSubmit={ handleSubmit }>
      <h3 >Redux Form Validation</h3>
      {JSON.stringify(values)}
      <div className="form-group">
        <Field name="firstName" component={renderField} label="First Name" />
      </div>
      <div className="form-group">
        <Field  name="lastName" component={renderField} label="Last Name" />
      </div>
      <div className="form-group">
        <Field name="email" component={renderField} label="Email" />
      </div>
      <div className="form-group">
        <button type="submit" className={pristine || invalid?"btn btn--primary disabled":"btn btn--primary"}>Submit</button>
        <button type="button" className="btn btn--secondary" onClick={()=>reset()}>Reset</button>
      </div>
      

    </form>
  )
}
FormCode = reduxForm({
  form: 'contact',
  validate,
})(FormCode);

export default FormCode;