const { mongoose } = require('../databaseConnection')
const Schema = mongoose.Schema
const { logger } = require('../../logger')
const loggerModule = 'emailSignUpModel.js'

logger.info('Loading in emailSignUpModel', {loggerModule, startUp: true})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Email', new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  addedDate: { type: Date, default: new Date() },
  endDate: Date
}))

