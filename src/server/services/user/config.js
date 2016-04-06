export default {
  model: 'user',
  namespace: '/user',
  options: {
    paginate: {
      default: 25,
      max: 50,
    },
  },
};
