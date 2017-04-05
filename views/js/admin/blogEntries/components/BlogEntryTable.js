import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import isEqual from 'lodash.isequal'

export default class BlogEntryTable extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
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
            <TableHeaderColumn>Remove</TableHeaderColumn>
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
