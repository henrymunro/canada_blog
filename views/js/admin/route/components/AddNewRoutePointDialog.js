import React from 'react'
import isEqual from 'lodash.isequal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

export default class AddNewRoutePointDialog extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const actions = [
      <FlatButton label='close' onClick={() => this.props.setNewRouteDialogOpen(false)} />,
      <FlatButton label='clear' onClick={this.props.resetForm} />,
      <FlatButton label='save' primary onClick={this.props.saveNewRoutePoint} />
    ]

    return <div>
      <RaisedButton label='Add new route point' onClick={() => this.props.setNewRouteDialogOpen(true)} />
      <Dialog
        title='Add new route point'
        actions={actions}
        modal={false}
        open={this.props.newDialogOpen}
        onRequestClose={function () {}}
>
        {this.props.children}
      </Dialog>
      <Snackbar
        open={this.props.showSnackBar}
        message='Route point added'
        autoHideDuration={4000}
        onRequestClose={this.props.hideSnackBar}
/>
    </div>
  }
}

AddNewRoutePointDialog.propTypes = {
  newDialogOpen: React.PropTypes.bool.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  setNewRouteDialogOpen: React.PropTypes.func.isRequired,
  showSnackBar: React.PropTypes.bool.isRequired,
  hideSnackBar: React.PropTypes.func.isRequired
// saveNewRoute: React.PropTypes.func.isRequired

}
