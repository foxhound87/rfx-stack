import path from 'path';
import { Dir } from '~/src/config';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

// css
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssFocus from 'postcss-focus';
// import basscss from 'postcss-basscss';
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
  plugins: [
    new ProgressBarPlugin(),
  ],
  postcss: ($webpack) => [
    postcssImport({ addDependencyTo: $webpack }),
    postcssExtend,
    postcssFocus,
    // basscss,
    autoprefixer,
    precss,
    cssnano,
  ],
};
