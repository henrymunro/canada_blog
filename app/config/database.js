'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  DATABASE_URL: joi.string().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  database: {
    URL: envVars.DATABASE_URL,
    username: envVars.DATABASE_USERNAME,
    password: envVars.DATABASE_PASSWORD
  }
}

module.exports = config
