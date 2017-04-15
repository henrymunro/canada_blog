const mongoose = require('mongoose')
const { logger, logError } = require('../logger')
const loggerModule = 'databaseConnection.js'
const config = require('../config').database

logger.info('Loading in databaseConnection', {loggerModule, startUp: true})

mongoose.connect(config.URL)
mongoose.Promise = global.Promise

// Test connection to DB
const db = mongoose.connection

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {
  logger.info(`Mongoose default connection open to ${config.URL}`, {loggerModule, type: 'database'})
})

// If the connection throws an error
db.on('error', (err) => {
  logError(err, 'Error connecting to database', loggerModule)
  // throw new Error(err)
})

// When the connection is disconnected
db.on('disconnected', function () {
  logger.error('Mongoose default connection disconnected', {loggerModule, type: 'database'})
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  db.close(function () {
    logger.info('Mongoose default connection disconnected through app termination', {loggerModule, type: 'database'})
    process.exit(0)
  })
})

module.exports = {
  mongoose: mongoose
}

