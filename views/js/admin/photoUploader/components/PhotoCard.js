import React from 'react'
import isEqual from 'lodash.isequal'
import {Card, CardMedia, CardTitle} from 'material-ui/Card'

export default class PhotoCard extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div>
      <Card>
        <CardMedia
          overlay={<CardTitle title={this.props.name} subtitle={this.props.summary} />}
          >
          <img src={this.props.imagePreviewUrl} />
        </CardMedia>
      </Card>
    </div>
  }
}

PhotoCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string,
  imagePreviewUrl: React.PropTypes.string.isRequired
}
