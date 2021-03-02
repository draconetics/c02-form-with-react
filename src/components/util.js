export const validate = (stringName, value, max, min) => {
  if (value.trim().length <= min) {
    return `${stringName} should be > ${min} characters`;
  }
  if (value.trim().length > max) {
    return `${stringName} should be <= ${max} characters`;
  }
  return '';
};

const emailIsValid = (emailValue) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue);
export const validateEmail = (emailInput) => {
  if (emailInput.length === 0) {
    console.log('return *');
    return 'required';
  }
  if (!emailIsValid(emailInput)) {
    return 'Email is not valid';
  }
  return '';
};

export default validate;
