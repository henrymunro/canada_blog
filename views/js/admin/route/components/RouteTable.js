import React from 'react'
import isEqual from 'lodash.isequal'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

export default class RouteTable extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props.children, nextProps.children)
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
            <TableHeaderColumn>Del</TableHeaderColumn>
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
