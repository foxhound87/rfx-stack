import bodyParser from 'body-parser';
import cors from 'cors';

const middleware = [
  cors({ origin: true }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

export { middleware as apiMiddleware };
