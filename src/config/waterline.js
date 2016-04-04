import mongoAdapter from 'sails-mongo';
import { Config } from '../config';

export default {
  adapters: {
    default: mongoAdapter,
    mongo: mongoAdapter,
  },
  connections: {
    mongo: {
      adapter: 'mongo',
      host: Config.db.host,
      port: Config.db.port,
      database: Config.db.name,
      // user: '',
      // password : '',
    },
  },
  defaults: {
    migrate: 'safe',
  },
};
