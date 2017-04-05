const { mongoose } = require('../databaseConnection')
const Schema = mongoose.Schema
const { logger } = require('../../logger')
const loggerModule = 'routeModel.js'

logger.info('Loading in routeModel', {loggerModule, startUp: true})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Route', new Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
  center: { type: Object, required: true },
  done: { type: Boolean, required: false },
  addedDate: { type: Date, default: new Date() },
  endDate: Date
}))

