import React from 'react'
import isEqual from 'lodash.isequal'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class PhotoUploaderDialog extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const actions = [
      <FlatButton label='close' onClick={() => this.props.cancel()} />,
      <FlatButton label='save' primary onClick={this.props.save} />
    ]

    const {uploadingCount, uploadedCount, uploadingErrorCount} = this.props
    const errorMessage = uploadingErrorCount > 0 && `, Error: ${uploadingErrorCount}`
    const statusMessage = (uploadedCount > 0 || uploadingCount > 0 || uploadingErrorCount > 0) && `Uploading: ${uploadingCount}, Uploaded: ${uploadedCount}`
    return <div>
      <Dialog
        title={'Upload photos  ' + statusMessage || undefined + errorMessage || undefined}
        actions={actions}
        modal={false}
        open={this.props.open}
        autoScrollBodyContent
        onRequestClose={this.props.cancel}
        repositionOnUpdate>
        {this.props.children}
      </Dialog>
    </div>
  }
}

PhotoUploaderDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  cancel: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  uploadingCount: React.PropTypes.number.isRequired,
  uploadedCount: React.PropTypes.number.isRequired,
  uploadingErrorCount: React.PropTypes.number.isRequired

}
