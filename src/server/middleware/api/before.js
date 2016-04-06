import bodyParser from 'body-parser';
import cors from 'cors';
import isDev from 'isdev';
import morgan from 'morgan';
import { log } from '~/src/server/logger';

export default function () {
  log.info('Init API Middleware: Before');
  const app = this;

  app.use(cors({ origin: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(isDev ? 'dev' : 'combined'));
}
