const aws = require('aws-sdk')
const { logger, logError } = require('../../../../logger')
const loggerModule = 's3uploader.js'
const config = require('../../../../config/config')
const { awsConfig, S3_BUCKET } = config

const getS3SignedUrl = (fileName, fileType) => {
  return new Promise((resolve, reject) => {
    logger.debug('Getting new S3 signed URL', {loggerModule, type: 'aws-s3', fileName, fileType})
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    }
    const s3 = new aws.S3(awsConfig)
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        logError(err, 'Error getting S3 signed URL', loggerModule)
        reject(err)
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      }
      logger.debug('Got S3 signed url', {loggerModule, signedURL: returnData})
      resolve(returnData)
    })
  })
}

module.exports = {
  getS3SignedUrl
}
