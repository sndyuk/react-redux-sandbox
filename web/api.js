const
  express = require('express'),
  router = express.Router(),
  debug = require('debug')('app:api_stub');


let permanentTodoId = 1;
router.post('/add_todo', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    id: req.body.id,
    permanentId: permanentTodoId += 1,
    text: req.body.text
  });
});

router.get('/*.json', function(req, res, next) {
  debug(req.path);
  res.setHeader('Content-Type', 'application/json');
  let pass = '../src/api_stub' + req.path;
  delete require.cache[require.resolve(pass)]
  res.send(require(pass));
});

module.exports = router;
