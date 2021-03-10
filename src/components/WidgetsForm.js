/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from './DatePicker';
import { multiFields, inputComponent } from './MultiSelect';

import 'react-widgets/dist/css/react-widgets.css';

const renderDateTimePicker = () => (
  <div>
    this is date picker
  </div>
);

const doSubmit = (values) => {
  console.log(JSON.stringify(values));
};

const WidgetsForm = (props) => {
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <Field
        multi
        name="multiFields"
        values={multiFields}
        component={inputComponent}
      />
      <FieldDatePicker name="dateStart" placeholder="Fecha Inicio" />
      <Field
        name="dateEnd"
        component={DatePicker}
        placeholder="Fecha Fin"
        parse={normalizeDates}
        format={formatDates}
      />
      <div>
        <label>DOB</label>
        <Field name="dob" showTime={false} component={renderDateTimePicker} />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Reset Values
        </button>
      </div>
    </form>
  );
};

WidgetsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'widgetsForm',
})(WidgetsForm);
