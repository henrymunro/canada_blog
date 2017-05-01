/* eslint-disable */
import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../../webAPI'

import axios from 'axios'


export default createActions({
  // Sever API
  // CLient changes
  [actions.UPLOAD_NEW_BLOG_PHOTOS]: (e) => _uploadPhotos(e),
  [actions.SAVE_UPLOADED_PHOTOS]: (photos) => _savePhotos(photos),
  [actions.UPDATE_UPLOADED_PHOTO]: (key, value, _id) => ({[key]: value, _id}),
  [actions.UPDATE_UPLOADED_PHOTO_DATABASE]: (updates, _id) => webAPI.photosAdmin.updatePhoto({updates, _id}),
  [actions.UPDATE_PHOTO_UPLOADER_PROP]: (key, value) => ({[key]: value}),

  // 
  [actions.UPLOAD_PHOTO_TO_SERVER]: (photo) => _savePhoto(photo),
  [actions.UPLOAD_PHOTO_TO_S3]: (photo) => _uploadPhotoToS3(photo),
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
        _id: Number(key),
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
// const _savePhotos = (photos) => {
//   return new Promise((outerResolve, outerReject) => {
//     const photosPromise = photos.map((photo) => {
//       return _savePhoto(photo)
//     })

//     Promise.all(photosPromise).then((result) => {
//       outerResolve(result)
//     }).catch((err) => {
//       outerReject(err)
//     })
//   })
// }

const _savePhoto = (photo) => {
  return new Promise((resolve, reject) => {
    console.log(photo)
    const photoSend = Object.assign({}, photo)
    var databaseInfo
    // Remove the actual image to reduce the overhead
    delete photoSend.imagePreviewUrl
    webAPI.photosAdmin.savePhotos(photoSend)
        .then((res) => {
          const { signedRequest, url, name, resizeURL } = res.data
          const databaseInfo = res.data.db
          console.log('RESULT: ', res)
          console.log('SIGNED REQUEST: ', signedRequest)
          console.log('PHOTO: ', photo)
          console.log('DATABASE INFO: ', databaseInfo)
          return resolve({signedRequest, photo, databaseInfo})
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
  })
}

const _uploadPhotoToS3 = ({signedRequest, photo, databaseInfo}) => {
  return new Promise((resolve, reject)=>{
    axios.put(signedRequest, photo.uploadDetails, { headers: {'content-type': photo.uploadDetails.type}})
      .then((s3Result) => {
        console.log('S3 Result: ', s3Result)
        const result = {
          s3Result,
          databaseInfo,
          success: s3Result.status===200 && s3Result.statusText==='OK'
        }
        resolve(result)
      }).catch(err => {
        reject(err)
      })    
  })
}

