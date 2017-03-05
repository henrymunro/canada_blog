const path = require('path')
const { logger } = require('../logger')
const loggerModule = 'config.js'
const environment = process.env.NODE_ENV || 'development'

logger.info('Loading in config', {loggerModule, startUp: true, environment})

let config

// Check to see if an incorrect environment has been set
if (['production', 'staging', 'development', 'test', 'test_production'].indexOf(environment) < 0) {
  logger.error(`Environment ${environment} not recognised`)
} else if (environment === 'test_production') {
// pull in test config for porduction testing, uses to test sessions
  config = 'test'
} else {
  config = environment
}

module.exports = require(path.join(__dirname, `./${config}.canada_blog.config.json`))

