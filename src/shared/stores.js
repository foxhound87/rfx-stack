import { store } from '~/src/utils/state';
import { isStrictModeEnabled } from 'mobx';

import UIStore from './stores/ui';
import AppStore from './stores/app';
import AuthStore from './stores/auth';
import PostStore from './stores/post';

/**
  Enables MobX strict mode globally.
  In strict mode, it is not allowed to
  change any state outside of an action
 */
isStrictModeEnabled();

/**
  Stores
*/
export default store
  .setup({
    ui: UIStore,
    app: AppStore,
    auth: AuthStore,
    post: PostStore,
  });
