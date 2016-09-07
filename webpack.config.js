module.exports = [
  {
  	entry: {
  		main: './src/app.js'
  	},
  	output: {
  		filename: 'bundle.js',
  		path: './public/script'
  	},
  	devtool: 'sourcemap',
  	module: {
  		loaders: [
  			{
  				test: /\.(js|jsx)$/,
  				exclude: /node_modules/,
  				loader: 'babel'
  			},
  			{
  				test: /\.css$/,
  				exclude: /node_modules/,
  				loader: 'css'
  			}
  		]
  	},
    node: {
      fs: "empty"
    }
  },
  {
  	entry: {
  		main: './tools/srcServer.js'
  	},
  	output: {
  		filename: 'bundle.js',
  		path: './'
  	},
  	devtool: 'sourcemap',
  	module: {
  		loaders: [
  			{
  				test: /\.(js|jsx)$/,
  				exclude: /node_modules/,
  				loader: 'babel'
  			},
  			{
  				test: /\.css$/,
  				exclude: /node_modules/,
  				loader: 'css'
  			}
  		]
  	},
    node: {
      fs: "empty"
    }
  }
];
