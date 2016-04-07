import { Dir } from '~/config';
import serveStatic from 'serve-static';

export function serveStaticMiddleware() {
  const app = this;

  app.use('/build', serveStatic(Dir.build));
  app.use('/static', serveStatic(Dir.static));
}
