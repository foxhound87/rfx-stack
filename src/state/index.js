import UIStore from '../stores/ui';
import AppStore from '../stores/app';
import AuthStore from '../stores/auth';
import PostStore from '../stores/post';

/**
  Inject Inital State into Stores
 */
export default (state) => ({
  ui: new UIStore(state.ui),
  app: new AppStore(state.app),
  auth: new AuthStore(state.auth),
  post: new PostStore(state.post),
});

