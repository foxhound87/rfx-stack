export default {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    email: {
      type: 'string',
      format: 'email',
      minLength: 5,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
  },
};
