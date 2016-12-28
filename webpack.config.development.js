const
  webpack = require('webpack'),
  pack = require('./webpack.config.js');

pack.devtool = 'source-map';
pack.performance = {
  hints: false
}

module.exports = pack;
