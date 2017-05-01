import React from 'react'
import isEqual from 'lodash.isequal'
import {Card, CardMedia} from 'material-ui/Card'

import ResizedPhoto from './ResizedPhoto'

export default class PhotoCard extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='col s6 m6 l4' style={{padding: 0}}>
      <Card style={{margin: '2px'}}>
        <CardMedia
          // overlay={<CardTitle title={this.props.photo.name} subtitle={this.props.photo.summary}/>}
          >
          <ResizedPhoto photo={this.props.photo} size='750x500' />
        </CardMedia>
      </Card>
    </div>
  }
}

PhotoCard.propTypes = {
  photo: React.PropTypes.object

}
