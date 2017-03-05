const { mongoose } = require('../databaseConnection')
const Schema = mongoose.Schema
const { logger } = require('../../logger')
const loggerModule = 'accountSchema.js'

logger.info('Loading in accountSchema', {loggerModule, startUp: true})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Account', new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: 0 }
}))
