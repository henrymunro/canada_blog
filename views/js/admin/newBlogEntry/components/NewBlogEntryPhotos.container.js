import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

import PhotoUploadViewer from './PhotoUploadViewer'
import PhotoEditerDialog from './PhotoEditerDialog'
import PhotoEditer from './PhotoEditer'
import {PhotoUploader} from '../../photoUploader'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    savedPhotos: selectors.getSavedPhotos(store),
    editPhotosDialogOpen: selectors.getEditPhotosDialogOpen(store),
    photosToEdit: selectors.getPhotosToEdit(store)
  }
}, actions)

export default class NewBlogEntryPhotos extends React.Component {

  render () {
    return <div>
      <PhotoEditerDialog
        open={this.props.editPhotosDialogOpen}
        cancel={() => this.props.toggleNewBlogEntryProp('editPhotosDialogOpen', false)}
        save={this.props.saveNewBlogPhotosEdits}>
        {this.props.photosToEdit.map(photo => <PhotoEditer photo={photo} _id={photo._id} onChange={this.props.onNewBlogPhotoEdit} key={photo._id} />)}
      </PhotoEditerDialog>
      {this.props.savedPhotos.length > 0 && <PhotoUploadViewer photos={this.props.savedPhotos} movePhotoUpInArray={this.props.moveNewBlogPhotoUpInArray} />}
      {this.props.savedPhotos.length > 0 && <FlatButton label='Edit Photos' primary onClick={() => this.props.toggleNewBlogEntryProp('editPhotosDialogOpen', true)} />}
      <PhotoUploader />
    </div>
  }
}

NewBlogEntryPhotos.propTypes = {

}
