import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

export default class RouteTable extends React.Component {
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
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Done</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody adjustForCheckbox={false}>
          {this.props.children}
        </TableBody>
      </Table>
    </div>
  }
}

RouteTable.propTypes = {

}
