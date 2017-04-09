const crypto = require('crypto')
const { logger, logError } = require('../logger')
const apiRoutes = require('./routes/apiRoutes')
const protectedApiRoutes = require('./routes/protectedApiRoutes')
const loggerModule = 'index.js'

module.exports = function (app) {
/*
* Generate a secret to sign JWTs, can call function again to reset and invalidate all tokens if needed
*/
  function generateJWTSecret () {
    crypto.randomBytes(48, function (err, buffer) {
      if (err) logError(err, 'Error generating JWT secret', loggerModule)
      const JWTSecret = buffer.toString('hex')
      app.set('JWTSecret', JWTSecret)
      logger.info('Resetting JWT secret', { loggerModule, secret: JWTSecret })
    })
  }
  generateJWTSecret()

/*
* Generate a secret to sign cookies, can call function again to reset and invalidate all tokens if needed
*/
  function generateCookieSecret () {
    crypto.randomBytes(48, function (err, buffer) {
      if (err) logError(err, 'Error generating cookieSecret', loggerModule)
      const cookieSecret = buffer.toString('hex')
      app.set('cookieSecret', cookieSecret)
      logger.info('Resetting cookieSecret', { loggerModule, secret: cookieSecret })
    })
  }
  generateCookieSecret()

// App level middleware
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST')
    res.header('Access-Control-Allow-Headers', 'Content-type')
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })

  app.use('/homeTest', require('./routes/home'))
  app.use('/api', protectedApiRoutes.authenticateApiRoutes)
  app.use('/api/secure', protectedApiRoutes.protectedApiRoutes)
  app.use('/api', apiRoutes)
  // app.use('/log', require('./routes/log'))
}
