export default {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 5,
    },
    password: {
      type: 'string',
      minLength: 5,
      maxLength: 20,
    },
  },
};
