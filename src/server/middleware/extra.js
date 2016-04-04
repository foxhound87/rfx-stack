import isDev from 'isdev';
import compression from 'compression';
import morgan from 'morgan';

const middleware = [
  compression(),
  morgan(isDev ? 'dev' : 'combined'),
];

export { middleware as extraMiddleware };
