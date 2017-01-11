import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import socket from 'feathers-socketio/client';
import io from 'socket.io-client';

let instance = false;
const config = global.CONFIG;
const storage = (global.TYPE === 'CLIENT') ? window.localStorage : null;
const uri = ['http://', config.io.host, ':', config.io.port].join('');

export function app() {
  if (instance) return instance;

  instance = feathers()
    .configure(socket(io(uri)))
    .configure(hooks())
    .configure(auth({ storage }));

  return instance;
}

export function service(name) {
  return app().service(name);
}
