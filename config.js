const production = typeof process.argv.find(opt => opt === '--production') !== 'undefined'
	
const config = {
  cdn: {
    uiResource: production ? 'http://localhost:3000/cdn' : ''
  }
}

module.exports = config;
