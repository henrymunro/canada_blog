import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

export default class BlogEntryTable extends React.Component {
  componentWillMount () {

  }

  render () {
    return <div>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>#</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Destination</TableHeaderColumn>
            <TableHeaderColumn>Dist</TableHeaderColumn>
            <TableHeaderColumn>Summary</TableHeaderColumn>
            <TableHeaderColumn>Photo Count</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody adjustForCheckbox={false}>
          {this.props.children}
        </TableBody>
      </Table>
    </div>
  }
}

BlogEntryTable.propTypes = {

}
