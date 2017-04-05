import React from 'react'
import { connect } from 'react-redux'

// Pull in presnentational compontents
import BlogEntryTable from './BlogEntryTable'
import BlogEntryTableRow from './BlogEntryTableRow'

import { getDayObjects } from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    dayObjects: getDayObjects(store)

  }
}, actions)

export default class BlogEntries extends React.Component {
  componentWillMount () {
    this.props.getAdminBlogEntries()
  }

  render () {
    const { dayObjects } = this.props
    const blogEntryTableRows = dayObjects.map(day => <BlogEntryTableRow {...day} key={day._id} onDelete={this.props.deleteBlogEntry} />)

    return <div>
      <BlogEntryTable>
        {blogEntryTableRows}
      </BlogEntryTable>
    </div>
  }
}

