import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { dispatch } from '~/src/utils/state';
import { action } from 'mobx';

class AuthForm extends Form {

  @action
  handleOnSubmit = (e) => {
    e.preventDefault();

    this.validate()
      .then((isValid) =>
        isValid && this.onSuccess());
  }

  onSuccess() {
    dispatch('auth.login', this.values())
      .then(() => dispatch('ui.authModal.toggle', 'close'))
      .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
      .then(() => this.clear())
      .catch((err) => this.invalidate(err.message));
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
