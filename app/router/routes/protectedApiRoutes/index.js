const authenticateApiRoutes = require('express').Router()
const protectedApiRoutes = require('express').Router()
const {authenticateUser, checkUserAccessToken} = require('../../../local_modules/authenticate')

// Protcted API  level middleware and check user toc
protectedApiRoutes.use(checkUserAccessToken)

// Authenticate routes
authenticateApiRoutes.route('/authenticate')
  .post(authenticateUser)

// Account routes
require('./account')(protectedApiRoutes)

// Blog Entry Admin routes
require('./blogEntryAdmin')(protectedApiRoutes)

// Route point routes
require('./route')(protectedApiRoutes)

// Route point routes
require('./photos')(protectedApiRoutes)

// Email sign up routes
require('./emailSignUpAdmin')(protectedApiRoutes)

module.exports = { protectedApiRoutes, authenticateApiRoutes }
