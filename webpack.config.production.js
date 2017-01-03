const
  webpack = require('webpack'),
  pack = require('./webpack.config.js'),
  LicenseWebpackPlugin = require('license-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  Visualizer = require('webpack-visualizer-plugin');

pack.plugins.push(new LicenseWebpackPlugin({ pattern: /^(MIT|ISC|BSD.*)$/ }));
pack.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: true, comments: false }));
pack.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
pack.plugins.push(new Visualizer({
  filename: './webpack-stats.html'
}));
pack.plugins.push(new CompressionPlugin({
  asset: '[path]',
  algorithm: 'gzip',
  test: /\.js$|\.css$/,
  threshold: 0,
  minRatio: 1
}));

pack.performance = {
  hints: 'warning',
  maxEntrypointSize: 120000,
  maxAssetSize: 100000,
  assetFilter: function(assetFilename) {
    return !(/\.map$/.test(assetFilename)) && !(/\webpack-stats.html$/.test(assetFilename))
  }
}

module.exports = pack;
