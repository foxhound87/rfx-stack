import React from 'react';
import { connect } from '~/src/utils/state';
import cx from 'classnames';

// components
import TextField from 'material-ui/TextField';

// styles
const errorMessage = cx('red', 'm1');

const AuthModal = ({ form }) => (
  <form>
    <TextField
      name={form.$('username').name}
      value={form.$('username').value}
      hintText={form.$('username').label}
      floatingLabelText={form.$('username').label}
      errorText={form.$('username').errorMessage}
      onChange={form.$('username').sync}
    />
    <TextField
      name={form.$('email').name}
      value={form.$('email').value}
      hintText={form.$('email').label}
      floatingLabelText={form.$('email').label}
      errorText={form.$('email').errorMessage}
      onChange={form.$('email').sync}
    />
    <TextField
      name={form.$('password').name}
      value={form.$('password').value}
      hintText={form.$('password').label}
      floatingLabelText={form.$('password').label}
      errorText={form.$('password').errorMessage}
      onChange={form.$('password').sync}
    />
    <div className="mt3">
      <button
        type="submit"
        disabled={!form.isValid}
        className="btn btn-primary"
        onClick={form.onSubmit}
      >Register</button>
    </div>
    <div
      className={cx(errorMessage, {
        hide: !form.isValid && form.genericErrorMessage,
      })}
    >
      {form.genericErrorMessage}
    </div>
  </form>
);

AuthModal.propTypes = {
  form: React.PropTypes.object,
};

export default connect(AuthModal);
