const
  webpack = require('webpack'),
  pack = require('./webpack.config.js');

pack.devtool = 'source-map';
pack.performance = {
  hints: 'warning',
  maxEntrypointSize: 1500000,
  maxAssetSize: 1500000
}

module.exports = pack;
