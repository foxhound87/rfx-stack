import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';

import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';

import AuthFormLogin from './form/AuthLogin';
import AuthFormRegister from './form/AuthRegister';

const handleShowSigninSection = () =>
  dispatch('ui.auth.toggleSection', 'signin');

const handleShowSignupSection = () =>
  dispatch('ui.auth.toggleSection', 'signup');

export default observer(({ showSection, forms }) => (
  <div className="flex items-center justify-center flex-column pv4 tc">
    <div className="cf dib pv3">
      <button
        onClick={handleShowSigninSection}
        className={cx($.buttonGroupLeft, {
          _bg1: showSection === 'signin',
        })}
      >Login</button>
      <button
        onClick={handleShowSignupSection}
        className={cx($.buttonGroupRight, {
          _bg1: showSection === 'signup',
        })}
      >Register</button>
    </div>

    <div className={cx({ dn: showSection !== 'signin' })}>
      <h3>Login</h3>
      <AuthFormLogin form={forms.login} />
    </div>

    <div className={cx({ dn: showSection !== 'signup' })}>
      <h3>Register</h3>
      <AuthFormRegister form={forms.register} />
    </div>
  </div>
));
