require('./init');

// neded for css import on node
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

require((process.env.NODE_ENV === 'production')
  ? '../src/web/server.iso'
  : '../src/web/server.hot'
);
