import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

// import PhotoPreview from './PhotoPreview'
import PhotoCard from './PhotoCard'
import PhotoUploaderDialog from './PhotoUploaderDialog'

import {getUploadedPhotos, getUploadPhotosPending, getUploadPhotoDialogOpen} from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    uploadedPhotos: getUploadedPhotos(store),
    uploadPhotosPending: getUploadPhotosPending(store),
    uploadPhotoDialogOpen: getUploadPhotoDialogOpen(store)
  }
}, actions)

export default class PhotoUploader extends React.Component {

  render () {
    const mappedPhotos = this.props.uploadedPhotos.map((photo, key) => {
      return <div className='col s6 m6 l3' key={photo._id}>
        <PhotoCard
          name={photo.name}
          summary={photo.summary}
          imagePreviewUrl={photo.imagePreviewUrl} />
      </div>
    })

    return <div>
      <RaisedButton label='Upload photos' onClick={() => this.props.updatePhotoUploaderProp('uploadPhotoDialogOpen', true)} />
      <PhotoUploaderDialog
        cancel={this.props.cancelPhotoUpload}
        open={this.props.uploadPhotoDialogOpen}
        save={() => this.props.saveUploadedPhotos(this.props.uploadedPhotos)} >
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
    //             <PhotoCard
    //             name={photo.name}
    //             summary={photo.summary}
    //             imagePreviewUrl={photo.imagePreviewUrl} />
    //           </PhotoPreview>
    // })

PhotoUploader.propTypes = {

}
