const production = typeof process.argv.find(opt => opt === '--production') !== 'undefined'

const config = {
  cdn: {
    uiResource: production ? 'http://localhost:3000/cdn' : ''
  },
  api: {
    main: 'http://localhost:3000/api'
  },
  history: {
    max: 10
  }
}


// Make all values double-quoted.
const _wrapStringForJs = (config) => {
  if (typeof config === 'undefined') return;
  const copy = {};
  Object.keys(config).forEach((key) => {
    const type = typeof config[key];
    if (type === 'string') {
      copy[key] = JSON.stringify(config[key]);
    } else if (type === 'number' || type === 'boolean') {
      copy[key] = config[key];
    } else {
      copy[key] = _wrapStringForJs(config[key]);
    }
  });
  return copy;
}
config.wrapStringForJs = () => _wrapStringForJs(config);

module.exports = config;
