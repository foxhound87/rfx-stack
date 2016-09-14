import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { dispatch } from '~/src/utils/state';

class UserForm extends Form {

  handleOnSubmit = (e) => {
    e.preventDefault();

    this.validate()
      .then(isValid =>
        isValid && this.onSuccess());
  }

  onSuccess() {
    dispatch('auth.register', this.values())
      .then(() => dispatch('ui.authModal.toggleSection', 'signin'))
      .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
      .then(() => this.clear())
      .catch(() => this.invalidate('The user already exist.'));
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
