import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// components
import Modal from 'react-modal';

// styles
const buttonGroup = cx('btn', 'left', 'x-group-item');
const authSection = cx('center', 'fit', 'col-8', 'px2', 'mx-auto');
const errorMessage = cx('red', 'm1');

const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    border: 0,
    padding: 0,
    maxWidth: '350px',
    maxHeight: '350px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const handleCloseModal = () =>
  dispatch('ui.authModal.toggle', 'close');

const handleShowSigninSection = () =>
  dispatch('ui.authModal.toggleSection', 'signin');

const handleShowSignupSection = () =>
  dispatch('ui.authModal.toggleSection', 'signup');

const handleOnChangeSigninInput = (e) =>
  dispatch('ui.authModal.updateSigninModel', {
    [e.target.name]: e.target.value,
  });

const handleOnChangeSignupInput = (e) =>
  dispatch('ui.authModal.updateSignupModel', {
    [e.target.name]: e.target.value,
  });

const handleOnSubmitFormLogin = (e) => {
  e.preventDefault();
  const { email, password } = dispatch('ui.authModal.getCredentials', 'signin');
  dispatch('auth.login', { email, password })
    .then(() => dispatch('ui.authModal.toggle', 'close'))
    .then(() => alert('Login Successful')) // eslint-disable-line no-alert
    .catch((errors) => dispatch('ui.authModal.setSigninErrors', errors.message));
};

const handleOnSubmitFormRegister = (e) => {
  e.preventDefault();
  const { email, password, username } = dispatch('ui.authModal.getCredentials', 'signup');
  dispatch('auth.register', { email, password, username })
    .then(() => dispatch('ui.authModal.toggle', 'close'))
    .then(() => alert('Register Successful')) // eslint-disable-line no-alert
    .catch((errors) => dispatch('ui.authModal.setSignupErrors', errors.message));
};

const AuthModal = ({ open, showSection, signinModel, signupModel, signinErrors, signupErrors }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <div className="center m3">
      <div className="inline-block clearfix blue">
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
      <form onSubmit={handleOnSubmitFormLogin}>
        <input
          className="field rounded fit mb1 p1"
          name="email"
          placeholder="Email"
          onChange={handleOnChangeSigninInput}
          value={signinModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          placeholder="Password"
          onChange={handleOnChangeSigninInput}
          value={signinModel.password}
        />
        <div><button type="submit" className="btn btn-primary">Login</button></div>
        <div className={cx(errorMessage, { hide: !signinErrors })}>{signinErrors}</div>
      </form>
    </div>

    <div className={cx(authSection, { hide: showSection !== 'signup' })}>
      <h3>Register</h3>
      <form onSubmit={handleOnSubmitFormRegister}>
        <input
          className="field rounded fit mb1 p1"
          name="username"
          placeholder="Username"
          onChange={handleOnChangeSignupInput}
          value={signupModel.username}
        />
        <input
          className="field rounded fit mb1 p1"
          name="email"
          placeholder="Email"
          onChange={handleOnChangeSignupInput}
          value={signupModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          placeholder="Password"
          onChange={handleOnChangeSignupInput}
          value={signupModel.password}
        />
        <div><button type="submit" className="btn btn-primary">Register</button></div>
        <div className={cx(errorMessage, { hide: !signupErrors })}>{signupErrors}</div>
      </form>
    </div>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
  showSection: React.PropTypes.string,
  signinModel: React.PropTypes.object,
  signupModel: React.PropTypes.object,
  signinErrors: React.PropTypes.string,
  signupErrors: React.PropTypes.string,
};

export default connect(AuthModal);
