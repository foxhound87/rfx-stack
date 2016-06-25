import Form from 'mobx-ajv-form';
import loginSchema from '~/src/shared/schemas/auth.login';
import { dispatch } from '~/src/shared/state/dispatcher';

class AuthLoginForm extends Form {

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (!this.validate()) return;

    dispatch('auth.login', this.values())
      .then(() => dispatch('ui.authModal.toggle', 'close'))
      .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
      .then(() => this.clear())
      .catch((err) => this.invalidate(err.message));
  }
}

export default
  new AuthLoginForm({
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
    },
  },
  loginSchema);
