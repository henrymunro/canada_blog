'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  AWS_ACCESS_KEY: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_REGION: joi.string().required(),
  AWS_PHOTO_BUCKET: joi.string().required(),
  AWS_PHOTO_ACCESS_URL: joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  AWS: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    region: envVars.AWS_REGION,
    photoUploadBucket: envVars.AWS_PHOTO_BUCKET,
    photoAccessURL: envVars.AWS_PHOTO_ACCESS_URL
  }
}

module.exports = config
