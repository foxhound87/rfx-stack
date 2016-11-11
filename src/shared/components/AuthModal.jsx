import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import _ from 'lodash';
import cx from 'classnames';
import $ from '~/src/shared/styles/_.mixins';

// components
import Modal from 'react-modal';
import AuthFormLogin from './AuthFormLogin';
import AuthFormRegister from './AuthFormRegister';

// styles
import modalBaseStyle from '../styles/_.modal.js';

const styles = _.cloneDeep(modalBaseStyle);

_.assign(styles.content, {
  maxWidth: '450px',
  maxHeight: '500px',
});

const handleCloseModal = () =>
  dispatch('ui.authModal.toggle', 'close');

const handleShowSigninSection = () =>
  dispatch('ui.authModal.toggleSection', 'signin');

const handleShowSignupSection = () =>
  dispatch('ui.authModal.toggleSection', 'signup');

export default observer(({ open, showSection, forms }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
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
  </Modal>
));
