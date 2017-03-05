const authenticateApiRoutes = require('express').Router()
const protectedApiRoutes = require('express').Router()
const { logger, logError } = require('../../../logger')
const loggerModule = 'protectedApiRoutes.js'
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const account = require('./account')
const authenticate = require('./authenticate')
const env = process.env.NODE_ENV || 'development'

// Protcted API  level middleware
protectedApiRoutes.use(function (req, res, next) {
// Ignore authentication for dev and testing
  if (env === 'test' || env === 'development') {
    next()
  } else {
// Pull out session info and decrypt
    const sessionid = req.session.sessionid
    if (sessionid) {
      const jwtSent = _decrypt(sessionid, req.app.get('cookieSecret'))
      logger.debug(authenticate.APISecret)
// Check the signature on the JWT
      jwt.verify(jwtSent, req.app.get('JWTSecret'), function (err, decoded) {
        if (err) {
          logError(err, 'JWT could not be verified', loggerModule)
          res.status(403).send('Access denied!')
        } else {
          console.log(decoded) // bar
          next()
        }
      })
    } else {
// No valid session
      logger.debug('No vaild session redirecting to login', { loggerModule })
/**
* TO DO REDIRECT TO LOGIN
*/
      res.status(403).send('Access denied!')
    }
  }
})

// Authenticate routes
authenticateApiRoutes.route('/authenticate')
  .post(authenticate.authenticateUser)

// Account routes
protectedApiRoutes.route('/account')
  .get(account.getAccounts)
  .post(account.postAccount)
protectedApiRoutes.route('/account/:username')
  .get(account.getAccountByUsername)
protectedApiRoutes.route('/account/:id')
  .delete(account.deleteAccount)
  .put(account.updateAccount)

function _decrypt (text, secret) {
  var decipher = crypto.createDecipher('aes-256-ctr', secret)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = { protectedApiRoutes, authenticateApiRoutes }
