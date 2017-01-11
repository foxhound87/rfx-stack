import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

export default observer(({ field, type = null }) => (
  <div>
    <TextField
      type={type || 'text'}
      name={field.name}
      value={field.value}
      floatingLabelText={field.label}
      hintText={field.placeholder}
      errorText={field.error}
      disabled={field.disabled}
      onChange={field.onChange}
      onFocus={field.onFocus}
      onBlur={field.onBlur}
    /><br />
  </div>
));
