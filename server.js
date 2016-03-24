require('babel-core/register');
require('isomorphic-fetch');

// neded for css import on node
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

require('./src/server.api');

require((process.env.NODE_ENV === 'production')
  ? './src/server.iso'
  : './src/server.hot'
);
