/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { SelectList, Multiselect } from 'react-widgets';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from './DatePicker';
import { multiFields, inputComponent } from './MultiSelect';

import 'react-widgets/dist/css/react-widgets.css';

const colors = [
  { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' },
];

const renderDropdownList = ({
  input, data, valueField, textField,
}) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

const renderMultiselect = ({
  input, data, valueField, textField,
}) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
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

export default reduxForm({
  form: 'widgetsForm',
})(WidgetsForm);
