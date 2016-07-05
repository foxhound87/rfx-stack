import bodyParser from 'body-parser';
import cors from 'cors';
import { log } from '~/src/utils/logger';

export default function () {
  log.info('Init API Middleware: Before');

  const app = this;

  app.use(cors({ origin: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
