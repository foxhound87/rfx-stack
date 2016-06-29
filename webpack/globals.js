import path from 'path';

const Dir = global.DIR;

// css
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssFocus from 'postcss-focus';
import postcssUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';

export default {
  resolve: {
    root: Dir.src,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      react: path.join(Dir.modules, 'react'),
    },
  },
  postcss: ($webpack) => [
    postcssImport({ addDependencyTo: $webpack }),
    postcssUrl('inline'),
    postcssExtend,
    postcssFocus,
    autoprefixer,
    precss,
    cssnano,
  ],
};
