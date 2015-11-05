export default {
  identity: 'user',
  connection: 'default',
  attributes: {
    email: {
      type: 'string',
      required: true,
    },

    name: {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    toJSON() {
      let obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
};