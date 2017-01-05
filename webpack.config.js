const
  webpack = require('webpack'),
  path = require('path'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')
  config = require('./config');

const pack = {
  context: __dirname,
  entry: {
    // -- Size of 'babel-polyfill' is too large --
    // Depending on what ES2015 methods you actually use, you may not need to use babel-polyfill or the runtime plugin. 
    // You may want to only load the specific polyfills you are using (like Object.assign) or just document that the environment the library is being loaded in should include certain polyfills.
    app: ['babel-polyfill', './src/script/'],
    vendor: ['react', 'react-router', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'isomorphic-fetch']
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: 'script/[name].js',
    chunkFilename: 'script/[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        include: /src\/script/,
        loader: 'eslint-loader',
        options: {
          fix: false, // Don't set true. I will broke your source code!
          configFile: path.resolve(__dirname, 'eslint.json')
        }
      },
      {
        test: /\.js(x?)$/,
        include: /src\/script/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&presets[]=react-optimize'
      },
      {
        test: /\.scss$/,
        include: /src\/style/,
        loader: ExtractTextPlugin.extract({ loader: 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap' })
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=50000'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
      'CONFIG': config.wrapStringForJs(),
      'DEBUG': process.env.NODE_ENV !== 'production'
    }),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, 'stylelint.js'),
      files: ['src/style/**/*.s?(a|c)ss']
    }),
    new ExtractTextPlugin({ filename: 'style/[name].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['app', 'vendor'],
        minChunks: Infinity
    })
  ]
};

module.exports = pack;
