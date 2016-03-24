import Waterline from 'waterline';

export default Waterline.Collection.extend({
  identity: 'post',
  schema: true,
  connection: 'mongo',
  attributes: {
    uuid: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    completed: {
      type: 'boolean',
      required: true,
    },
  },
});
