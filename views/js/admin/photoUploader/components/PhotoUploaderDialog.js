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

    return <div>
      <Dialog
        title='Upload photos'
        actions={actions}
        modal={false}
        open={this.props.open}
        autoScrollBodyContent
        onRequestClose={this.props.cancel}
>
        {this.props.children}
      </Dialog>
    </div>
  }
}

PhotoUploaderDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  cancel: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired
// showSnackBar: React.PropTypes.bool.isRequired,
// hideSnackBar: React.PropTypes.func.isRequired
// saveNewRoute: React.PropTypes.func.isRequired

}
