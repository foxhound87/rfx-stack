import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';

import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import _ from 'lodash';
import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';
import modalBaseStyle from '@/shared/styles/_.modal.js';

const styles = _.cloneDeep(modalBaseStyle);
const errorMessage = cx('red', 'm1');
const button = cx($.buttonPill, '_c1', '_b1', 'b');

_.assign(styles.content, {
  maxWidth: '450px',
  maxHeight: '300px',
});

// events
const handleCloseModal = () =>
  dispatch('ui.postCreateModal.open', false);

export default observer(({ open, form }) => (
  <Modal
    contentLabel="Create Post Modal"
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    {!(form && form.$) ? null : (
      <div className="ma3">
        <h3>{form.$('uuid').value ? 'Edit' : 'Create'} Post</h3>
        <form>
          <div className="pb3">
            <TextField
              hintText="Title"
              floatingLabelText={form.$('title').label}
              name={form.$('title').name}
              value={form.$('title').value}
              errorText={form.$('title').error}
              onChange={form.$('title').sync}
            />
            <Toggle
              className="pt3"
              labelPosition="right"
              label={form.$('completed').label}
              name={form.$('completed').name}
              defaultToggled={form.$('completed').value}
              onToggle={form.$('completed').onChange}
            />
          </div>
          <div className="tc">
            <button
              type="submit"
              className={button}
              onClick={form.onSubmit}
            >Save</button>
          </div>
          <div
            className={cx(errorMessage, {
              hide: !form.isValid && form.genericErrorMessage,
            })}
          >
            {form.genericErrorMessage}
          </div>
        </form>
      </div>
    )}
  </Modal>
));
