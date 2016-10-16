import path from 'path';

const Dir = global.DIR;

export default {
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: path.join(Dir.modules, 'react'),
    },
  },
};
