const
  express = require('express'),
  router = express.Router(),
  debug = require('debug')('app:api_stub');

router.get('/*.json', function(req, res, next) {
  debug(req.path);
  res.setHeader('Content-Type', 'application/json');
  let pass = '../src/api_stub' + req.path;
  delete require.cache[require.resolve(pass)]
  res.send(require(pass));
});

module.exports = router;
