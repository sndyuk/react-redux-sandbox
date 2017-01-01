const
  express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  webpack = require('webpack'),
  debug = require('debug')('app:server');

const
  app = express(),
  router = express.Router();

const production = process.env.NODE_ENV === 'production';

app.set('views', path.resolve(__dirname, '../src/view'));
app.set('view engine', 'pug');
app.locals.pretty = true;

app.get('/favicon.ico', function(req, res) {
  res.setHeader('Content-Length', 0);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  res.sendStatus(200);
});

morgan.token('body', function (req, res) {
  if (req.method.toUpperCase() === 'GET') {
    return;
  }
  return '\n' + JSON.stringify(req.body, null, 2);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', require(path.join(__dirname, 'api.js')));

app.use(express.static(path.join(__dirname, '../build'), {
  setHeaders: function (res, path, stat) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }
}));

// Webpack
const webpackConfig = require(production ? '../webpack.config.production' : '../webpack.config.prerendering');

// hot reloading settings
webpackConfig.entry.app.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
const webpackCompiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  watchOptions: false,
  lazy: false,
  stats: {
    colors: true
  },
  headers: {
    'Content-Encoding': production ? 'gzip' : ''
  }
}));
app.use(require('webpack-hot-middleware')(webpackCompiler, {
  log: require('debug')('app:webpack-hot-middleware'), path: '/__webpack_hmr', heartbeat: 10 * 1000
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
      error: err
    });
  }
});

module.exports = app;
