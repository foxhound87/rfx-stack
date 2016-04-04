import UIStore from '../stores/ui';
import AppStore from '../stores/app';
import PostStore from '../stores/post';

/**
  Inject Inital State into Stores
 */
export default (state) => ({
  ui: new UIStore(state.ui),
  app: new AppStore(state.app),
  post: new PostStore(state.post),
});
