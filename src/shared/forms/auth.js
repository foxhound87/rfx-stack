import Form from 'mobx-ajv-form';
import schema from '~/src/shared/schemas/auth';
import { dispatch } from '~/src/utils/state';
import { action } from 'mobx';

class AuthForm extends Form {

  @action
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
  new AuthForm({
    schema,
    // fields: {
    //   email: {
    //     label: 'Email',
    //   },
    //   password: {
    //     label: 'Password',
    //   },
    // },
  });
