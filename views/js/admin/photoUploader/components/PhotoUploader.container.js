import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

// import PhotoPreview from './PhotoPreview'
import UploadPhotoCard from './UploadPhotoCard'
import PhotoUploaderDialog from './PhotoUploaderDialog'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    uploadedPhotos: selectors.getUploadedPhotos(store),
    uploadPhotosPending: selectors.getUploadPhotosPending(store),
    uploadPhotoDialogOpen: selectors.getUploadPhotoDialogOpen(store),
    // Photo upload status
    uploadingCount: selectors.getUploadingCount(store),
    uploadedCount: selectors.getUploadedCount(store),
    uploadingErrorCount: selectors.getUploadingErrorCount(store)
  }
}, actions)

export default class PhotoUploader extends React.Component {

  uploadPhotos () {
    // Map over the photos
    console.log('Uploading Photos')
    const photosPromise = this.props.uploadedPhotos.map((photo, key) => {
      return new Promise((resolve, reject) => {
        console.log('Uploading photo: ', key)
        // Send details to the server to get a signed URL
        this.props.uploadPhotoToServer(photo)  // UPLOAD_PHOTO_TO_SERVER
          .then((res) => {
            const {signedRequest, photo, databaseInfo} = res.value
            console.log('Saved photo to DB: ', key)
            // Upload the photo to the S3 bucket
            return this.uploadPhotoToS3(({signedRequest, photo, databaseInfo, key}))
          }).then(response => {
            resolve()
          }).catch(err => {
            console.error('ERROR UPLOADING PHOTO: ', err)
            reject()
          })
      })
    })

    // Once all response have come back close the modal
    Promise.all(photosPromise).then(returnedPhotos => {
      console.log('All photos uploaded: ', returnedPhotos)
      // Close dialog
      this.props.updatePhotoUploaderProp('uploadPhotoDialogOpen', false)
      // Clear uploaded photo info to free memory
      this.props.updatePhotoUploaderProp('uploadedPhotos', [])
    }).catch(err => {
      console.error('ERROR UPLOADING PHOTOS: ', err)
    })
  }

  uploadPhotoToS3 ({signedRequest, photo, databaseInfo, key}) {
    // Upload the photo to the S3 bucket
    return new Promise((resolve, reject) => {
      console.log('Saving photo to S3')
      this.props.updateUploadedPhoto('uploading', true, key)
      this.props.uploadPhotoToS3({signedRequest, photo, databaseInfo})
        .then(result => {
          const {s3Result, databaseInfo, success} = result.value
          // If sucessful mark the photo as uploaded in the database
          console.log('Photo saved to S3, updating DB: ', s3Result)
          this.props.updateUploadedPhoto('uploading', false, key)
          this.props.updateUploadedPhoto('uploaded', true, key)
          return this.props.updateUploadedPhotoDatabase({uploaded: success}, databaseInfo._id)
        }).then(response => {
          resolve()
        }).catch(err => {
          // If S3 upload fails log this to the database
          this.props.updateUploadedPhoto('uploading', false, key)
          this.props.updateUploadedPhoto('uploaded', false, key)
          this.props.updateUploadedPhoto('error', true, key)
          this.props.updateUploadedPhotoDatabase({uploaded: false}, databaseInfo._id)
          console.error('ERROR UPLOADING PHOTO TO S3: ', err)
          reject()
        })
    })
  }

  render () {
    const mappedPhotos = this.props.uploadedPhotos.map((photo, key) => {
      return <div className='col s6 m6 l3' key={photo._id}>
        <UploadPhotoCard
          name={photo.name}
          summary={photo.summary}
          uploading={photo.uploading}
          uploaded={photo.uploaded}
          imagePreviewUrl={photo.imagePreviewUrl} />
      </div>
    })

      // this.props.saveUploadedPhotos(this.props.uploadedPhotos)} >
    return <div>
      <RaisedButton label='Upload photos' onClick={() => this.props.updatePhotoUploaderProp('uploadPhotoDialogOpen', true)} />
      <PhotoUploaderDialog
        uploadingCount={this.props.uploadingCount}
        uploadedCount={this.props.uploadedCount}
        uploadingErrorCount={this.props.uploadingErrorCount}
        cancel={this.props.cancelPhotoUpload}
        open={this.props.uploadPhotoDialogOpen}
        save={this.uploadPhotos.bind(this)}>
        <div className='row'>
          <input
            type='file'
            name='img'
            multiple
            onChange={this.props.uploadNewBlogPhotos} />
        </div>
        <div className='row'>
          {mappedPhotos}
        </div>
      </PhotoUploaderDialog>
    </div>
  }
}

    // const mappedPhotos = this.props.photos.map((photo, key) => {
    //   return <PhotoPreview
    //           name={photo.name}
    //           summary={photo.summary}
    //           date={photo.date}
    //           onChange={(key, value) => this.props.updateUploadedPhoto(key, value, photo._id)}
    //           key={key}>
    //             <UploadPhotoCard
    //             name={photo.name}
    //             summary={photo.summary}
    //             imagePreviewUrl={photo.imagePreviewUrl} />
    //           </PhotoPreview>
    // })

PhotoUploader.propTypes = {

}
