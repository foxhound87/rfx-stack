import hooks from 'feathers-hooks';

/**
  Hook: after
  Service: user
*/
export default {
  all: [
    hooks.remove('__v', 'password'),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
