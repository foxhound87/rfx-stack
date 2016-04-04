import Waterline from 'waterline';

export default Waterline.Collection.extend({
  identity: 'user',
  schema: true,
  connection: 'mongo',
  attributes: {
    uuid: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
  },
});
