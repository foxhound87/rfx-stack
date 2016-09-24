import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { dispatch } from '~/src/utils/state';

class PostForm extends Form {

  onSuccess(form) {
    dispatch('post.create', form.values())
      .then(() => dispatch('ui.postCreateModal.open', false))
      .then(() => dispatch('ui.snackBar.open', 'Post Created.'))
      .then(() => form.clear())
      .catch(data => form.invalidate(data.message));
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
