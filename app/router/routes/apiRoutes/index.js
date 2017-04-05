const apiRoutes = require('express').Router()

// Blog routes
require('./blog')(apiRoutes)

// Route routes
require('./route')(apiRoutes)

module.exports = apiRoutes
