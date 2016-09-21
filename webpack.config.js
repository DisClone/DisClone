const webpack = require('webpack');
const baseConfig = require('./webpack.config.dev');

const config = Object.create(baseConfig);
config.debug = true;

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './src/app'
];


config.module.loaders.push({
  test: /\.module\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
});


module.exports = config;
