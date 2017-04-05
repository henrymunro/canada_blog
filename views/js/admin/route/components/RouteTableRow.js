import React from 'react'
import isEqual from 'lodash.isequal'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

export default class RouteTableRow extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    const pullProps = (state) => {
      const { number, name, done, doneSelectDisabled } = state
      return { number, name, done, doneSelectDisabled }
    }
    return !isEqual(pullProps(this.props), pullProps(nextProps))
  }

  render () {
    const { number, name, done, doneSelectDisabled, _id } = this.props

    return <TableRow
      onMouseEnter={() => this.props.onMouseEnter(_id)}
      onMouseLeave={() => this.props.onMouseEnter(undefined)}>
      <TableRowColumn>{number}</TableRowColumn>
      <TableRowColumn>{name}</TableRowColumn>
      <TableRowColumn>
        <Checkbox
          checked={done}
          disabled={doneSelectDisabled}
          onClick={() => this.props.onChange('done', !done)} />
      </TableRowColumn>
      <TableRowColumn><div onClick={() => this.props.onDelete(_id)}>x</div></TableRowColumn>
    </TableRow>
  }
}

RouteTableRow.propTypes = {
  number: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  done: React.PropTypes.bool.isRequired,
  doneSelectDisabled: React.PropTypes.bool.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onMouseEnter: React.PropTypes.func.isRequired

}
