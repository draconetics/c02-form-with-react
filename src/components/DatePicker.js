import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import esLocale from 'moment/locale/es';
import moment from 'moment';
import { Field } from 'redux-form';

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    moment.locale('es', esLocale);
    this.focused = false;
  }

  onFocusChange(value) {
    const { focused } = this.state;
    this.setState({ focused: !focused });
    const { input } = this.props;
    input.onFocus(value);
  }

  render() {
    const {
      input,
      meta: { touched, error },
      placeholder,
      disabled,
    } = this.props;
    const { focused } = this.state;

    return (
      <>
        <SingleDatePicker
          showClearDate
          showDefaultInputIcon
          displayFormat="YYYY-MM-DD"
          numberOfMonths={1}
          disabled={disabled}
          placeholder={placeholder}
          date={input.value}
          onDateChange={input.onChange}
          focused={focused}
          onFocusChange={this.onFocusChange}
          id={input.name}
        />
        {error && touched && <span>{error}</span>}
      </>
    );
  }
}

const item = {
  onchange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
const metaItem = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  warning: PropTypes.bool.isRequired,
};
DatePicker.propTypes = {
  input: PropTypes.shape(PropTypes.shape(item)).isRequired,
  meta: PropTypes.shape(PropTypes.shape(metaItem)).isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
};

export const formatDates = (value) => (value ? moment(value) : null);

export const normalizeDates = (value) => (value ? value.format('YYYY-MM-DD') : null);

export const FieldDatePicker = (props) => (
  <Field
    normalize={normalizeDates}
    format={formatDates}
    // eslint-disable-next-line react/destructuring-assignment
    name={props.name}
    component={DatePicker}
    props={props}
  />
);

FieldDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DatePicker;
