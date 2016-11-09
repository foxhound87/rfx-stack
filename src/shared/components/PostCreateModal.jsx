import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from '~/src/utils/state';
import cx from 'classnames';
import _ from 'lodash';

// components
import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

// styles
import modalBaseStyle from '../styles/_.modal.js';

const styles = _.cloneDeep(modalBaseStyle);
const errorMessage = cx('red', 'm1');

_.assign(styles.content, {
  maxWidth: '450px',
  maxHeight: '300px',
});

// events
const handleCloseModal = () =>
  dispatch('ui.postCreateModal.open', false);

export default observer(({ open, form }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <div className="m3">
      <h3>Create Post</h3>
      <form>
        <div className="pb3">
          <TextField
            hintText="Title"
            floatingLabelText={form.$('title').label}
            name={form.$('title').name}
            value={form.$('title').value}
            errorText={form.$('title').errorMessage}
            onChange={form.$('title').sync}
          />
          <Toggle
            className="pt3"
            labelPosition="right"
            label={form.$('completed').label}
            name={form.$('completed').name}
            defaultToggled={form.$('completed').value}
            onToggle={form.$('completed').sync}
          />
        </div>
        <div className="center">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
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
  </Modal>
));
