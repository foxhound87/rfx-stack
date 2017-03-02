import { dispatch } from 'rfx-core';
import { action } from 'mobx';
import Form from './_.extend';

export class PostForm extends Form {
  onSuccess(form) {
    const storeAction = form.values().uuid ? 'post.update' : 'post.create';

    dispatch(storeAction, form.values())
      .then(() => dispatch('ui.postCreateModal.open', false))
      .then(() => dispatch('ui.snackBar.open', 'Post Saved.'))
      .then(() => form.clear())
      .catch((err) => {
        form.invalidate(err.message);
        dispatch('ui.snackBar.open', err.message);
      })
      .then(action(() => (form.$loading = false))); // eslint-disable-line
  }
}

export const fields = {
  title: {
    label: 'Title',
    rules: 'required|string|between:5,50',
  },
  completed: {
    label: 'Completed',
    value: true,
    rules: 'boolean',
  },
  uuid: {
    rules: 'string',
    value: null,
  },
};

export function init(values = {}) {
  return new PostForm({ fields, values });
}

export default new PostForm({ fields });
