import React from 'react';
import { observer } from 'mobx-react';

import TextField from './inputs/MaterialTextField';
import FormControls from './controls/FormControls';

export default observer(({ form }) => (
  <form>
    <TextField type="text" field={form.$('email')} />
    <TextField type="password" field={form.$('password')} />
    <FormControls
      form={form}
      controls={{ onSubmit: true }}
      labels={{ submit: 'Login' }}
    />
    <p className="red">{form.error}</p>
  </form>
));
