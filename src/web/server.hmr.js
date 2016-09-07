import feathers from 'feathers';
import { logServerConfig } from '~/src/utils/logger';
import { setupServer, startServer } from '~/src/utils/server.start';
import app from './server';

setupServer({
  namespace: 'web',
  logger: logServerConfig,
});

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading...');
  });

  console.info('✅  Server-side HMR Enabled!');
} else {
  console.info('❌  Server-side HMR Not Supported.');
}

export default feathers()
  .use((req, res) => app.handle(req, res))
  .configure(startServer);
