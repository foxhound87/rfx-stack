import hooks from 'feathers-hooks';

/**
  Hook: after
  Service: post
*/
export default {
  all: [
    hooks.remove('_id', '__v'),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
