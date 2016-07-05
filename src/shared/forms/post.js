import Form from 'mobx-ajv-form';
import { dispatch } from '~/src/utils/state';

class PostForm extends Form {

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (!this.validate()) return;

    dispatch('post.create', this.values())
      .then(() => dispatch('ui.postCreateModal.open', false))
      .then(() => dispatch('ui.snackBar.open', 'Post Created.'))
      .then(() => this.clear())
      .catch((data) => this.invalidate(data.message));
  }
}

export default
  new PostForm({
    fields: {
      title: {
        value: '',
      },
      completed: {
        value: true,
      },
    },
  });
