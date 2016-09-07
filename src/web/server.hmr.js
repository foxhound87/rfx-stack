import feathers from 'feathers';
import { log, logServerConfig } from '~/src/utils/logger';
import { setupServer, startServer } from '~/src/utils/server.start';
import app from './server';

setupServer({
  namespace: 'web',
  logger: logServerConfig,
});

if (module.hot) {
  module.hot.accept('./server', () =>
    log.info('🔁  HMR Reloading...'));

  log.info('✅  Server-side HMR Enabled.');
} else {
  log.info('❌  Server-side HMR Not Supported.');
}

export default feathers()
  .use((req, res) => app.handle(req, res))
  .configure(startServer);
