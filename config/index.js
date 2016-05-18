import { Env as Config } from './env';
import { Dir } from './dir';

/**
  Expose Config on client-side
  WARNING: Do not expose passwords!
*/
const ExposeConfigToClient = {
  web: Config.web,
  api: Config.api,
  io: Config.io,
};

export { Dir, Config, ExposeConfigToClient };
