import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';

import _ from 'lodash';
import modalBaseStyle from '@/shared/styles/_.modal.js';

import Modal from 'react-modal';
import AuthForm from './AuthForm';

const styles = _.cloneDeep(modalBaseStyle);

_.assign(styles.content, {
  maxWidth: '450px',
  maxHeight: '500px',
});

const handleCloseModal = () =>
  dispatch('ui.auth.toggleModal', 'close');

export default observer(({ open, showSection, forms }) => (
  <Modal
    contentLabel="Auth Modal"
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <AuthForm
      showSection={showSection}
      forms={forms}
    />
  </Modal>
));
