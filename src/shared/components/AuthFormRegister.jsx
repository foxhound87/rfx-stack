import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import TextField from 'material-ui/TextField';
import $ from '@/shared/styles/_.mixins';

const errorMessage = cx('red', 'm1');
const button = cx($.buttonPill, '_c1', '_b1', 'b');

export default observer(({ form }) => (
  <form>
    <TextField
      name={form.$('username').name}
      value={form.$('username').value}
      hintText={form.$('username').label}
      floatingLabelText={form.$('username').label}
      errorText={form.$('username').error}
      onChange={form.$('username').sync}
    />
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
    <div className="pt4">
      <button
        type="submit"
        className={button}
        onClick={form.onSubmit}
      >Register</button>
    </div>
    <div
      className={cx(errorMessage, {
        dn: form.hasError && form.genericErrorMessage,
      })}
    >
      {form.genericErrorMessage}
    </div>
  </form>
));
