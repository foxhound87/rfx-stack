import React from 'react';
import { observer } from 'mobx-react';

import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';

const errorMessage = cx('red', 'm2', 'pt4');
const button = cx($.buttonPill, '_c1', '_b1', 'b');

export default observer(({ form, controls = null, labels = null }) => (
  <div>
    <div className="pt4">

      {(!controls || controls.onSubmit) &&
        <button className={button} type="submit" onClick={form.onSubmit}>
          <i className="fa fa-dot-circle-o" /> {labels.submit || 'Submit'}
        </button>}

      {(!controls || controls.onClear) &&
        <button className={button} type="button" onClick={form.onClear}>
          <i className="fa fa-eraser" /> {labels.clear || 'Clear'}
        </button>}

      {(!controls || controls.onReset) &&
        <button className={button} type="button" onClick={form.onReset}>
          <i className="fa fa-refresh" /> {labels.reset || 'Reset'}
        </button>}

    </div>

    {((!controls || controls.error) && form.hasError) &&
      <p className={errorMessage}><i>{form.error}</i></p>}

  </div>
));
