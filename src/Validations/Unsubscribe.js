import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateUnsubscribe(data) {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Billing Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFormValid:isEmpty(errors)
  }
}