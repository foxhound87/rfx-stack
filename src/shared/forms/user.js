import { dispatch } from 'rfx-core';
import Form from './_.extend';

class UserForm extends Form {

  onSuccess(form) {
    return dispatch('auth.register', form.values())
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
    fields: {
      username: {
        label: 'Username',
        rules: 'required|string|between:5,20',
        placeholder: 'Insert Username',
      },
      email: {
        label: 'Email',
        rules: 'required|email|string|between:5,50',
        placeholder: 'Insert Email',
      },
      password: {
        label: 'Password',
        rules: 'required|string|between:5,20',
        placeholder: 'Insert Password',
        related: ['passwordConfirm'],
      },
      passwordConfirm: {
        label: 'Confirm Password',
        rules: 'required|string|between:5,20|same:password',
        placeholder: 'Insert Confirmation Password',
      },
    },
  });
