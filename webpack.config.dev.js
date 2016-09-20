import webpack from 'webpack';
import path from 'path';

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',//note that it reloads the page if hot module reloading fails.
    path.join(__dirname, 'src/app.js')
  ],
  target: 'web', //can change to node to run with backend
  output: {
    path: path.join(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: __dirname + './src',
  //   historyApiFallback: true,
  //   proxy: {
  //    '*' : 'http://localhost:3000'
  //  }
  // },
 //  plugins: [
 //    new webpack.optimize.OccurenceOrderPlugin(),
 //    new webpack.HotModuleReplacementPlugin()
 // ],
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', "react-hmre"]
        }
      },
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.scss)$/, loaders: ['style', 'css', 'sass']},
      //font types
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      //images
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/,loader: "file-loader"}
    ]
  }
};
