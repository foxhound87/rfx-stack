import React from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// styles
const errorMessage = cx('red', 'm2');

// components
import TextField from 'material-ui/TextField';

const AuthModal = ({ form }) => (
  <form>
    <TextField
      hintText="Email"
      floatingLabelText="Email"
      name="email"
      value={form.fields.email.value}
      errorText={form.fields.email.errorMessage}
      onChange={form.syncValue}
    />
    <TextField
      hintText="Password"
      floatingLabelText="Password"
      name="password"
      value={form.fields.password.value}
      errorText={form.fields.password.errorMessage}
      onChange={form.syncValue}
    />
    <div className="mt3">
      <button
        type="submit"
        disabled={!form.isValid}
        className="btn btn-primary"
        onClick={form.handleOnSubmit}
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
