import { dispatch } from 'rfx-core';
import validatorjs from 'validatorjs';
import Form from './_.extend';

class PostForm extends Form {

  onSuccess(form) {
    dispatch('post.create', form.values())
      .then(() => dispatch('ui.postCreateModal.open', false))
      .then(() => dispatch('ui.snackBar.open', 'Post Created.'))
      .then(() => form.clear())
      .catch((err) => {
        form.invalidate(err.message);
        dispatch('ui.snackBar.open', err.message);
      });
  }
}

export default
  new PostForm({
    plugins: {
      dvr: validatorjs,
    },
    fields: {
      title: {
        label: 'Title',
        rules: 'required|string|between:5,50',
      },
      completed: {
        label: 'Completed',
        value: true,
        rules: 'boolean',
      },
    },
  });
