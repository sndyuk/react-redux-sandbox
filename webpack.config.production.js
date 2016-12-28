const
  webpack = require('webpack'),
  pack = require('./webpack.config.js'),
  LicenseWebpackPlugin = require('license-webpack-plugin');

pack.plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') }}));
pack.plugins.push(new LicenseWebpackPlugin({ pattern: /^(MIT|ISC|BSD.*)$/ }));
pack.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: true, comments: false }));

module.exports = pack;
