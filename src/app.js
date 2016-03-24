import feathers from 'feathers/client';
import feathersHooks from 'feathers-hooks';
import feathersSocketClient from 'feathers-socketio/client';
import socketClient from 'socket.io-client';

let instance = false;

const uri = 'http://localhost:9090';

export function app() {
  if (instance) return instance;

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(socketClient(uri)));

  return instance;
}

export function service(name) {
  return app().service(name);
}
