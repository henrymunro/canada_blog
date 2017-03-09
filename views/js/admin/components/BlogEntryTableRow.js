import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

export default class BlogEntryTableRow extends React.Component {

  render () {
    const { dayNumber, date, title, distanceKm, summary, photos } = this.props
    return <TableRow>
      <TableRowColumn>{dayNumber}</TableRowColumn>
      <TableRowColumn>{date}</TableRowColumn>
      <TableRowColumn>{title}</TableRowColumn>
      <TableRowColumn>{distanceKm}</TableRowColumn>
      <TableRowColumn>{summary}</TableRowColumn>
      <TableRowColumn>{photos.length}</TableRowColumn>
    </TableRow>
  }
}

BlogEntryTableRow.propTypes = {
  dayNumber: React.PropTypes.number.isRequired,
  date: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  distanceKm: React.PropTypes.number,
  summary: React.PropTypes.string,
  photos: React.PropTypes.array

}
