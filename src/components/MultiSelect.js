/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export const multiFields = [
  { label: 'Empathy', value: 'EMPATHY' },
  { label: 'Moral', value: 'MORAL' },
  { label: 'Compassion', value: 'COMPASSION' },
  { label: 'My Values', value: 'MY_VALUES' },
  { label: 'Practical', value: 'PRACTICAL' },
  { label: 'Ethical', value: 'ETHICAL' },
];

export const inputComponent = ({ values, input }) => (
  <MultiSelect
    {...input}
    values={values}
    onSelect={(valueX) => input.onChange(valueX)}
    currents={
      input.value === '' ? JSON.stringify([]) : JSON.stringify(input.value)
    }
  />
);

const addToMultiSelect = (selected, newItem, cb) => {
  if (newItem && selected) {
    if (selected.includes(newItem)) {
      return cb(selected.filter((item) => item !== newItem));
    }
    selected.push(newItem);
    return cb(selected);
  }
  return false;
};

const MultiSelect = ({
  values, onSelect, currents,
}) => (
  <div>
    <div>
      {values.map(({ label, value }) => (
        <div key={`${label}-${value}`}>
          {JSON.parse(currents).includes(value) === true ? (
            <div
              role="option"
              tabIndex="0"
              aria-selected="true"
              style={{ backgroundColor: 'red' }}
              onClick={() => addToMultiSelect(JSON.parse(currents), value, onSelect)}
            >
              {label}
            </div>
          ) : (
            <div
              role="option"
              tabIndex="0"
              aria-selected="false"
              onClick={() => addToMultiSelect(JSON.parse(currents), value, onSelect)}
            >
              {label}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

MultiSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.arrayOf.isRequired,
    }),
  ).isRequired,
  currents: PropTypes.string.isRequired,
};
