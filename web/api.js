const
  express = require('express'),
  router = express.Router(),
  kuromoji = require('kuromoji'),
  debug = require('debug')('app:api_stub');

let tokenizer = null;
kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict/' }).build((err, _tokenizer) => {
  if (err) {
    throw new Error(err);
  }
  tokenizer = _tokenizer;
});

let permanentTodoId = 1;
router.post('/add_todo', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  const tokens = tokenizer.tokenize(req.body.text);
  debug(tokens);

  const readings = [];
  tokens.forEach(token => {
    if(token['word_type'] === 'KNOWN' && token['pos'] === '名詞') {
      readings.push(token['surface_form'])
    }
  });
  debug(readings);

  res.send({
    id: req.body.id,
    permanentId: permanentTodoId += 1,
    words: readings
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
