import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import isEqual from 'lodash.isequal'

export default class BlogEntryTableRow extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const { dayNumber, date, title, distanceKm, summary, photos, _id } = this.props
    return <TableRow>
      <TableRowColumn>{dayNumber}</TableRowColumn>
      <TableRowColumn>{date}</TableRowColumn>
      <TableRowColumn>{title}</TableRowColumn>
      <TableRowColumn>{distanceKm}</TableRowColumn>
      <TableRowColumn>{summary}</TableRowColumn>
      <TableRowColumn>{photos.length}</TableRowColumn>
      <TableRowColumn><div onClick={() => this.props.onDelete(_id)}>del</div></TableRowColumn>
    </TableRow>
  }
}

BlogEntryTableRow.propTypes = {
  _id: React.PropTypes.string.isRequired,
  dayNumber: React.PropTypes.number.isRequired,
  date: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  distanceKm: React.PropTypes.number,
  summary: React.PropTypes.string,
  photos: React.PropTypes.array,
  onDelete: React.PropTypes.func.isRequired

}
