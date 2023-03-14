import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateSignup(data) {
  let errors = {};

  if (validator.isEmpty(data.first_name)) {
    errors.first_name = 'This field is required';
  }
  if (validator.isEmpty(data.last_name)) {
    errors.last_name = 'This field is required';
  }
  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.paypal_account)) {
    errors.paypal_account = 'This field is required';
  }
  if (!validator.isEmail(data.paypal_account)) {
    errors.paypal_account = 'Paypal Email is invalid';
  }
  if (validator.isEmpty(data.terms_of_service_agree)) {
    errors.terms_of_service_agree = 'You must agree with terms of service';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFormValid:isEmpty(errors)
  }
}