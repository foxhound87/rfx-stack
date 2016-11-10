import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { dispatch } from '~/src/utils/state';

class AuthForm extends Form {

  onSuccess(form) {
    dispatch('auth.login', form.values())
      .then(() => dispatch('ui.authModal.toggle', 'close'))
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
    plugins: {
      dvr: validatorjs,
    },
    fields: {
      email: {
        label: 'Email',
        rules: 'required|email|string|between:5,20',
      },
      password: {
        label: 'Password',
        rules: 'required|between:5,20',
      },
    },
  });
