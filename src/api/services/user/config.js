export default {
  model: 'user',
  namespace: '/user',
  options: {
    id: 'uuid',
    paginate: {
      default: 25,
      max: 50,
    },
  },
};
