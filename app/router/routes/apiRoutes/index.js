const apiRoutes = require('express').Router()

// Blog routes
require('./blog')(apiRoutes)

// Route routes
require('./route')(apiRoutes)

// Photos routes
require('./photos')(apiRoutes)

// Photos routes
require('./emailSignUp')(apiRoutes)

module.exports = apiRoutes
