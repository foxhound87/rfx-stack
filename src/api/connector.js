import mongoose from 'mongoose';

export function connector(config) {
  const { host, port, name } = config;
  const uri = ['mongodb://', host, ':', port, '/', name].join('');
  mongoose.Promise = global.Promise;
  return mongoose.connect(uri);
}
