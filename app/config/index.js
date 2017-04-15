
require('dotenv').config({})

// Import specific config
const AWS = require('./AWS')
const database = require('./database')
const server = require('./server')

module.exports = Object.assign({}, AWS, database, server)
