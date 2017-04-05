import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import BlogOverview from './BlogOverview'
import BlogPost from './BlogPost'

@connect((store) => {
  return {
    blog: selectors.getBlog(store)

  }
}, actions)

export default class Blog extends React.Component {
  componentWillMount () {
    this.props.getBlog()
  }

  render () {
    console.log('BLOG: ', this.props.blog)
    const blogPost = this.props.blog[1]

    const mappedBlogs = this.props.blog.map((blogEntry, key) => {
      return <BlogOverview
        title={blogEntry.title}
        dayNumber={blogEntry.dayNumber}
        url={(blogEntry.photos[0] || {}).url}
        key={blogEntry._id} />
    })

    return <div>
      <h1>blog</h1>
      {mappedBlogs}
      {blogPost && <BlogPost title={blogPost.title} dayNumber={blogPost.dayNumber} blog={blogPost.blog} />}
    </div>
  }
}

