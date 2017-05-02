import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'
import color from 'styles/color'

import {NavBar} from '../../home'
import PhotoCard from './PhotoCard'
import PhotoGroup from './PhotoGroup'

@connect((store, ownProps) => {
  return {
    photos: selectors.getPhotos(store),
    currentRoute: ownProps.location.pathname
  }
}, actions)

export default class Photos extends React.Component {

  componentWillMount () {
    this.props.getPhotos()
  }

  render () {
    return <div style={{background: color.themeBackground}}>
      <NavBar currentRoute={this.props.currentRoute} width='100%' />
      <h1>Photos</h1>
      {this.props.photos.map((blogEntry, key) => {
        return <PhotoGroup title={blogEntry.title} dayNumber={blogEntry.dayNumber} key={blogEntry._id}>
          {blogEntry.photos.map(photo => <PhotoCard photo={photo} key={photo._id} onError={() => this.props.removePhotoOnLoadError({blogId: blogEntry._id, _id: photo._id})} />)}
        </PhotoGroup>
      })}

    </div>
  }
}
