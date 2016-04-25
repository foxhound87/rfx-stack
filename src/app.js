import feathers from 'feathers/client';
import feathersHooks from 'feathers-hooks';
import feathersSocketClient from 'feathers-socketio/client';
import feathersAuth from 'feathers-authentication/client';
import socketIOClient from 'socket.io-client';

let instance = false;
const config = global.CONFIG;
const storage = global.CLIENT ? window.localStorage : null;
const uri = ['http://', config.io.host, ':', config.io.port].join('');

export function app() {
  if (instance) return instance;

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(socketIOClient(uri)))
    .configure(feathersAuth({ storage,
      tokenKey: 'token',
      cookie: 'token',
    }));

  return instance;
}

export function service(name) {
  return app().service(name);
}
