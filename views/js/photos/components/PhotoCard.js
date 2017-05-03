import React from 'react'
import isEqual from 'lodash.isequal'
import {Card, CardMedia} from 'material-ui/Card'

import ResizedPhoto from './ResizedPhoto'

export default class PhotoCard extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const imageStyle = {
      // filter: 'brightness(1.1)',

      mozTransition: 'all 0.3s',
      webkitTransition: 'all 0.3s',
      transition: 'all 0.3s'
    }

    const imageHoverStyle = {
      transform: 'scale(1.1)'
    }

    const fullImageStyle = !this.props.hovered ? imageStyle : Object.assign({}, imageStyle, imageHoverStyle)

    return <div
      className='col s6 m6 l4'
      style={{padding: 0}}
      onClick={this.props.onClick}
      onMouseEnter={this.props.onMouseEnter}
      onMouseLeave={this.props.onMouseLeave}>
      <Card style={{margin: '2px', zIndex: 0}}>
        <CardMedia
          style={{padding: 0, overflow: 'hidden'}}
          // overlay={!this.props.hovered ? <div /> : <CardTitle title={this.props.photo.name} subtitle={this.props.photo.summary} />}
          >
          <ResizedPhoto photo={this.props.photo} style={fullImageStyle} size='750x500' onError={this.props.onError} />
        </CardMedia>
      </Card>
    </div>
  }
}

PhotoCard.propTypes = {
  photo: React.PropTypes.object,
  onError: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onClick: React.PropTypes.func,
  hovered: React.PropTypes.bool

}
