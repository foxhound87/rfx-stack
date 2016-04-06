export default {
  model: 'post',
  namespace: '/post',
  options: {
    paginate: {
      default: 25,
      max: 50,
    },
  },
};
