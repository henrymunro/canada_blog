import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

export default class RouteTableRow extends React.Component {

  render () {
    const { order, name, done, doneSelectDisabled } = this.props

    return <TableRow>
      <TableRowColumn>{order}</TableRowColumn>
      <TableRowColumn>{name}</TableRowColumn>
      <TableRowColumn>
        <Checkbox
          checked={done}
          disabled={doneSelectDisabled}
/>
      </TableRowColumn>
    </TableRow>
  }
}

RouteTableRow.propTypes = {
  order: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  done: React.PropTypes.bool.isRequired,
  doneSelectDisabled: React.PropTypes.bool.isRequired

}
