import React from 'react'
import isEqual from 'lodash.isequal'
import {Card, CardMedia, CardTitle} from 'material-ui/Card'

export default class PhotoCard extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const { uploaded, uploading } = this.props
    const style = uploading ? 'orange' : uploaded ? 'green' : 'black'
    console.log('PHOTO CARD TITLE: ', style)

    return <div>
      <Card>
        <CardMedia
          overlay={<CardTitle title={this.props.name} subtitle={this.props.summary} titleStyle={{color: style}} />}
          overlayStyle={{color: style}}
          >
          <img src={this.props.imagePreviewUrl} onLoad={() => { window.dispatchEvent(new Event('resize')) }} />
        </CardMedia>
      </Card>
    </div>
  }
}

PhotoCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string,
  imagePreviewUrl: React.PropTypes.string.isRequired,
  uploaded: React.PropTypes.bool,
  uploading: React.PropTypes.bool
}
