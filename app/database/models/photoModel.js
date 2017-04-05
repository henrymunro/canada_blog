const { mongoose } = require('../databaseConnection')
const Schema = mongoose.Schema
const { logger } = require('../../logger')
const loggerModule = 'photoModel.js'

logger.info('Loading in photoSchema', {loggerModule, startUp: true})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Photo', new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String },
  uploadDetails: { type: Object },
  addedDate: { type: Date, default: new Date() },
  endDate: { type: Date }
}))

