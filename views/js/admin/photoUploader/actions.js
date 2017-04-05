/* eslint-disable */
import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../../webAPI'

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default createActions({
  // Sever API
  // CLient changes
  [actions.UPLOAD_NEW_BLOG_PHOTOS]: (e) => _uploadPhotos(e),
  [actions.SAVE_UPLOADED_PHOTOS]: (photos) => _savePhotos(photos),
  [actions.UPDATE_UPLOADED_PHOTO]: (key, value, _id) => ({[key]: value, _id}),
  [actions.UPDATE_PHOTO_UPLOADER_PROP]: (key, value) => ({[key]: value})
},
  actions.CANCEL_PHOTO_UPLOAD
)

// Function to handle photo uploads to the browser
const _uploadPhotos = (e) => {
  const files = e.target.files
  const photosPromise = Object.keys(files).map(key => _uploadPhoto(files[key], key))
  return new Promise((resolve, reject) => {
    Promise.all(photosPromise).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
      alert(err)
    })
  })
}

const _uploadPhoto = (photo, key) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve({
        _id: key,
        uploadDetails: photo,
        date: photo.lastModifiedDate,
        name: photo.name,
        imagePreviewUrl: reader.result
      })
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(photo)
  })
}

// Function to handle photo saves to the server
const _savePhotos = (photos) => {
  return new Promise((outerResolve, outerReject) => {
    const photosPromise = photos.map((photo) => {
      return _savePhoto(photo)
    })

    Promise.all(photosPromise).then((result) => {
      outerResolve(result)
    }).catch((err) => {
      outerReject(err)
    })
  })
}

const _savePhoto = (photo) => {
  return new Promise((resolve, reject) => {
    console.log(photo)
    const photoSend = Object.assign({}, photo)
    var databaseInfo
    // Remove the actual image to reduce the overhead
    delete photoSend.imagePreviewUrl
    api.post('/photos', photoSend)
        .then((res) => {
          console.log('RESULT: ', res)
          const { signedRequest, url } = res.data
          databaseInfo = res.data.db
          return axios.put(signedRequest, photo.uploadDetails, { headers: {'content-type': photo.uploadDetails.type}})
        }).then((s3Result) => {
          console.log('S3 Result: ', s3Result)
          const result = {
            s3Result,
            databaseInfo
          }
          resolve(result)
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
  })
}

// const _getS3SignedURL = () => {
//   return api.post('/photos', photoSend)
// }

// const _uploadToS3SignedURL = (signedRequest, photo) => {
//   return axios.put(signedRequest, photo.uploadDetails, { headers: {'Content-Type': photo.uploadDetails.type}})
// }
