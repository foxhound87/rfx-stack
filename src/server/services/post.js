import { Service } from 'feathers-waterline';

export default class PostService extends Service {

  namespace = 'post';

  paginate = {
    default: 20,
    max: 20,
  };

//   setup(app, path) {}
//   get(params, callback) {}
//   find(params, callback) {}
//   create(data, params, callback) {}
//   update(id, data, params, callback) {}
//   patch(id, data, params, callback) {}
//   remove(id, params, callback) {}
}
