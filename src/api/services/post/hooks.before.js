import { hooks as auth } from 'feathers-authentication';
import { setUUID } from '@/api/hooks/setUUID';

/**
  Hook: before
  Service: post
*/
export default {
  all: [
    auth.authenticate(['jwt', 'local']),
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
