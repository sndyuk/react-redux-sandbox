const
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  webpack = require('webpack');

const
  app = express(),
  router = express.Router();

const production = process.env.NODE_ENV === 'production';

const webpackConfig = require(production ? '../webpack.config.production' : '../webpack.config.prerendering');

//-- Hot reloading settings
webpackConfig.entry.app.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
const webpackCompiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(webpackCompiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(webpackCompiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.set('views', path.resolve(__dirname, '../src/view'));
app.set('view engine', 'pug');
app.locals.pretty = true;

app.get('/favicon.ico', function(req, res) {
  res.setHeader('Content-Length', 0);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  res.sendStatus(200);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Don't cache.
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', require(path.join(__dirname, 'api.js')));
app.use('/', router.get('/*', function(req, res) {
  res.render(req.path.substr(1));
}));

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  let contentType = req.get('Content-Type');
  if (contentType && contentType.startsWith('application/json')) {
    res.setHeader('Content-Type', 'application/json');
    res.send('{"data": "' + err.message + '"}');
  } else {
    res.render('error', {
      message: err.message,
      error: err
    });
  }
});

module.exports = app;
