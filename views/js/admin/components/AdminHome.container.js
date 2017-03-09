import React from 'react'
import { connect } from 'react-redux'
// import { StickyContainer, Sticky } from 'react-sticky'
// import RaisedButton from 'material-ui/RaisedButton'
// import baseStyles from 'styles/base.css'

// Pull in presnentational compontents
import BlogEntryTable from './BlogEntryTable'
import BlogEntryTableRow from './BlogEntryTableRow'
import RouteTable from './RouteTable'
import RouteTableRow from './RouteTableRow'
import { mapRouteTableRows } from '../model'

@connect((store) => {
  return {
    axios: store.axios.axios,
    admin: store.admin

  }
})

export default class AdminHome extends React.Component {
  componentWillMount () {

  }

  render () {
    console.log('This Props: ', this.props)
    const { dayObjects, route } = this.props.admin
    const blogEntryTableRows = dayObjects.map(day => <BlogEntryTableRow {...day} key={day._id} />)
    const routeTableRows = mapRouteTableRows(route, RouteTableRow)

    return <div>
      <RouteTable>
        {routeTableRows}
      </RouteTable>
      <BlogEntryTable>
        {blogEntryTableRows}
      </BlogEntryTable>
    </div>
  }
}
