import React from 'react';
import { connect } from '~/src/utils/state';
import cx from 'classnames';

// components
import TextField from 'material-ui/TextField';

// styles
const errorMessage = cx('red', 'm2');

const AuthModal = ({ form }) => (
  <form>
    <TextField
      name={form.$('email').name}
      value={form.$('email').value}
      hintText={form.$('email').label}
      floatingLabelText={form.$('email').label}
      errorText={form.$('email').error}
      onChange={form.$('email').sync}
    />
    <TextField
      type="password"
      name={form.$('password').name}
      value={form.$('password').value}
      hintText={form.$('password').label}
      floatingLabelText={form.$('password').label}
      errorText={form.$('password').error}
      onChange={form.$('password').sync}
    />
    <div className="mt3">
      <button
        type="submit"
        disabled={!form.isValid}
        className="btn btn-primary"
        onClick={form.onSubmit}
      >Login</button>
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
