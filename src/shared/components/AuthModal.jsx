import React from 'react';
import { connect, dispatch } from '~/src/utils/state';
import cx from 'classnames';
import _ from 'lodash';

// components
import Modal from 'react-modal';
import AuthFormLogin from './AuthFormLogin';
import AuthFormRegister from './AuthFormRegister';

// styles
import modalBaseStyle from '../styles/_.modal.js';
const styles = _.cloneDeep(modalBaseStyle);
const buttonGroup = cx('btn', 'left', 'x-group-item');
const authSection = cx('center', 'fit', 'col-8', 'px2', 'mb3', 'mx-auto');

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

const AuthModal = ({ open, showSection, forms }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <div className="center m3">
      <div className="inline-block clearfix">
        <button
          onClick={handleShowSigninSection}
          className={cx(buttonGroup, 'rounded-left', {
            'btn-primary': showSection === 'signin',
            'btn-outline': showSection !== 'signin',
          })}
        >Login</button>
        <button
          onClick={handleShowSignupSection}
          className={cx(buttonGroup, 'rounded-right', {
            'btn-primary': showSection === 'signup',
            'btn-outline': showSection !== 'signup',
          })}
        >Register</button>
      </div>
    </div>

    <div className={cx(authSection, { hide: showSection !== 'signin' })}>
      <h3>Login</h3>
      <AuthFormLogin form={forms.login} />
    </div>

    <div className={cx(authSection, { hide: showSection !== 'signup' })}>
      <h3>Register</h3>
      <AuthFormRegister form={forms.register} />
    </div>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
  forms: React.PropTypes.object,
  showSection: React.PropTypes.string,
};

export default connect(AuthModal);
