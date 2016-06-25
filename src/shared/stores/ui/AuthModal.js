import { observable, action } from 'mobx';
import { dispatch } from '~/src/shared/state/dispatcher';
import Form from 'mobx-ajv-form';

// form json-schemas
import loginSchema from '~/src/shared/schemas/auth.login';
import registerSchema from '~/src/shared/schemas/auth.register';

export default class AuthModal {

  @observable isOpen = false;
  @observable showSection = 'signin';

  forms = {
    login: null,
    register: null,
  };

  constructor(data) {
    action(() => Object.assign(this, data));
    this.setupLoginForm();
    this.setupRegisterForm();
  }

  @action
  toggle(flag = null, section = null) {
    if (!flag) this.isOpen = !this.isOpen;
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
    if (section) this.toggleSection(section);
  }

  @action
  toggleSection(to = 'signin') {
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }

  setupLoginForm() {
    const fields = {
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
    };

    this.forms.login = new Form(fields, loginSchema);
  }

  setupRegisterForm() {
    const fields = {
      username: {
        label: 'Username',
      },
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
    };

    this.forms.register = new Form(fields, registerSchema);
  }

  loginOrShowError() {
    const form = this.forms.login;
    if (!form.validate()) return;

    dispatch('auth.login', form.values())
      .then(() => dispatch('ui.authModal.toggle', 'close'))
      .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
      .then(() => form.clear())
      .catch((err) => form.invalidate(err.message));
  }

  registerOrShowError() {
    const form = this.forms.register;
    if (!form.validate()) return;

    dispatch('auth.register', form.values())
      .then(() => dispatch('ui.authModal.toggleSection', 'signin'))
      .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
      .then(() => form.clear())
      .catch(() => form.invalidate('The user already exist.'));
  }
}
