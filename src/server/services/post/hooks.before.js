// import { hooks as auth } from 'feathers-authentication';
import { setUUID } from '~/src/server/hooks/setUUID';

/**
  Hook: before
  Service: post
*/
export default {
  all: [
    // auth.verifyToken(),
  ],
  find: [],
  get: [],
  create: [
    setUUID(),
  ],
  update: [],
  patch: [],
  remove: [],
};
