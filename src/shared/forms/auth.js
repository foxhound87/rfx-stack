import { dispatch } from 'rfx-core';
import Form from './_.extend';

class AuthForm extends Form {

  onSuccess(form) {
    return dispatch('auth.login', form.values())
      .then(() => dispatch('ui.auth.toggleModal', 'close'))
      .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
      .then(() => form.clear())
      .catch((err) => {
        form.invalidate(err.message);
        dispatch('ui.snackBar.open', err.message);
      });
  }
}

export default
  new AuthForm({
    fields: {
      email: {
        label: 'Email',
        placeholder: 'Insert Email',
        rules: 'required|email|string|between:5,50',
      },
      password: {
        label: 'Password',
        placeholder: 'Insert Password',
        rules: 'required|between:5,20',
      },
    },
  });
