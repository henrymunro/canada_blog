const aws = require('aws-sdk')
const { logger, logError } = require('../logger')
const loggerModule = 's3uploader.js'
const { accessKeyId, secretAccessKey, region, photoUploadBucket, photoAccessURL } = require('../config').AWS

const getS3SignedUrl = (fileName, fileType) => {
  return new Promise((resolve, reject) => {
    logger.debug('Getting new S3 signed URL', {loggerModule, type: 'aws-s3', fileName, fileType})
    const s3Params = {
      Bucket: photoUploadBucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    }
    const s3 = new aws.S3({accessKeyId, secretAccessKey, region})
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        logError(err, 'Error getting S3 signed URL', loggerModule)
        reject(err)
      }
      const returnData = {
        signedRequest: data,
        resizeURL: photoAccessURL,
        name: fileName,
        url: `https://${photoUploadBucket}.s3.amazonaws.com/${fileName}`
      }
      logger.debug('Got S3 signed url', {loggerModule, signedURL: returnData})
      resolve(returnData)
    })
  })
}

module.exports = {
  getS3SignedUrl
}

// http://serverlessimageresize-imagebucket-13vuzexfssbzk.s3-website.eu-west-2.amazonaws.com/
