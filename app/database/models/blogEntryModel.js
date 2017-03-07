const { mongoose } = require('../databaseConnection')
const Schema = mongoose.Schema
const { logger } = require('../../logger')
const loggerModule = 'blogEntryModel.js'

logger.info('Loading in blogEntrySchema', {loggerModule, startUp: true})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('BlogEntry', new Schema({
  dayNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  fullText: { type: String, required: false },
  photos: { type: Array, required: false },
  budget: { type: Array, required: false },
  addedDate: { type: Date, default: new Date() }
}))

