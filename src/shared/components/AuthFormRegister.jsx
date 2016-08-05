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
      name={form.fields.username.name}
      value={form.fields.username.value}
      hintText={form.fields.username.label}
      floatingLabelText={form.fields.username.label}
      errorText={form.fields.username.errorMessage}
      onChange={form.syncValue}
    />
    <TextField
      name={form.fields.email.name}
      value={form.fields.email.value}
      hintText={form.fields.email.label}
      floatingLabelText={form.fields.email.label}
      errorText={form.fields.email.errorMessage}
      onChange={form.syncValue}
    />
    <TextField
      name={form.fields.password.name}
      value={form.fields.password.value}
      hintText={form.fields.password.label}
      floatingLabelText={form.fields.password.label}
      errorText={form.fields.password.errorMessage}
      onChange={form.syncValue}
    />
    <div className="mt3">
      <button
        type="submit"
        disabled={!form.isValid}
        className="btn btn-primary"
        onClick={form.handleOnSubmit}
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
