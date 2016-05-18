import path from 'path';

const Dir = {
  config: path.resolve(__dirname),
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '..', 'src'),
  modules: path.resolve(__dirname, '..', 'node_modules'),
  public: path.resolve(__dirname, '..', 'public'),
  build: path.resolve(__dirname, '..', 'public', 'build'),
  static: path.resolve(__dirname, '..', 'public', 'static'),
  components: path.resolve(__dirname, '..', 'src', 'components'),
  containers: path.resolve(__dirname, '..', 'src', 'containers'),
  stores: path.resolve(__dirname, '..', 'src', 'stores'),
  server: path.resolve(__dirname, '..', 'src', 'server'),
  services: path.resolve(__dirname, '..', 'src', 'server', 'services'),
  hooks: path.resolve(__dirname, '..', 'src', 'server', 'hooks'),
  middleware: path.resolve(__dirname, '..', 'src', 'server', 'middleware'),
};

export { Dir };
