// Route point routes
const routeURI = '/photos'
const PhotoModel = require('./../../../database/models/photoModel')
const photoRoutes = require('../apiRouteCreator')(PhotoModel)
const { logger, logError } = require('../../../logger')
const loggerModule = 'photos.js'
const env = process.env.NODE_ENV || 'development'
const { getS3SignedUrl } = require('../../../local_modules/s3uploader')

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(photoRoutes.getEntries)
.post(_postPhotos)

  apiRoute.route(routeURI + '/:id')
.get(photoRoutes.getEntryByID)
.delete(photoRoutes.deleteEntry)
.put(photoRoutes.updateEntry)
}

const _postPhotos = (req, res) => {
  var resultToSendToClient
  logger.debug('Request recieved to upload photos', {loggerModule, URL: req.originalUrl})//, count: photos.length })
  getS3SignedUrl(req.body.name, req.body.uploadDetails.type)
  .then((result) => {
    resultToSendToClient = result
    return _logPhotoToDB(req.body, result.url)
  }).then((result) => {
    resultToSendToClient.db = result
    res.json(resultToSendToClient)
  }).catch((err) => {
    logError(err, `Error getting signed S3 url  ${req.originalUrl}`, loggerModule)
    env ? res.send(err) : res.send({error: true, msg: 'An error has occoured'}) // Only send stack in dev
  })
}

const _logPhotoToDB = (photo, url) => {
  return new Promise((resolve, reject) => {
    const photoDetails = {
      name: photo.name,
      url,
      date: photo.date,
      uploadDetails: photo.uploadDetails
    }
    const newPhoto = new PhotoModel(photoDetails)
    newPhoto.save((err, entry) => {
      if (err) {
        logError(err, `Error creating entry ${photo.name}`, loggerModule)
        reject(err)
      } else { // If no errors, send it back to the client
        resolve(entry)
      }
    })
  })
}
