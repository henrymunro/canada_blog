import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import isEqual from 'lodash.isequal'

export default class BlogPost extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const spacedBlog = this.props.blog.map((para, key) => <p key={key}>{para}</p>)
    return <div className='container'>
      <Card>
        <CardTitle title={this.props.title} subtitle={this.props.dayNumber} />
        <CardText>
          {spacedBlog}
        </CardText>
      </Card>
    </div>
  }
}

BlogPost.propTypes = {
  title: React.PropTypes.string.isRequired,
  dayNumber: React.PropTypes.number,
  blog: React.PropTypes.array.isRequired
}
