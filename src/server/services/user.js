import { Service } from 'feathers-waterline';

export default class UserService extends Service {

  namespace = 'user';

  config = {
    paginate: {
      default: 3,
      max: 5,
    },
  }

//   find(params, callback) {}
//   get(id, params, callback) {}
//   create(data, params, callback) {}
//   update(id, data, params, callback) {}
//   patch(id, data, params, callback) {}
//   remove(id, params, callback) {}
//   setup(app, path) {}
}
