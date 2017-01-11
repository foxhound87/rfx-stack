import { dispatch } from 'rfx-core';
import validatorjs from 'validatorjs';
import Form from './_.extend';

class UserForm extends Form {

  onSuccess(form) {
    dispatch('auth.register', form.values())
      .then(() => dispatch('ui.auth.toggleSection', 'signin'))
      .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
      .then(() => form.clear())
      .catch((err) => {
        form.invalidate(err.message);
        dispatch('ui.snackBar.open', err.message);
      });
  }
}

export default
  new UserForm({
    plugins: {
      dvr: validatorjs,
    },
    fields: {
      username: {
        label: 'Username',
        rules: 'required|string|between:5,20',
      },
      email: {
        label: 'Email',
        rules: 'required|email|string|between:5,20',
      },
      password: {
        label: 'Password',
        rules: 'required|string|between:5,20',
      },
    },
  });
