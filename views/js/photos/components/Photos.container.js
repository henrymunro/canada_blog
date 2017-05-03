import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer } from 'react-sticky'

import * as selectors from '../reducer'
import actions from '../actions'
import color from 'styles/color'

import {NavBar} from '../../home'
import FullSizePhoto from './FullSizePhoto'
import PhotoCard from './PhotoCard'
import PhotoGroup from './PhotoGroup'

@connect((store, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname,
    photos: selectors.getPhotos(store),
    photoHovered: selectors.getPhotoHovered(store),
    photoClicked: selectors.getPhotoClicked(store)
  }
}, actions)

export default class Photos extends React.Component {

  componentWillMount () {
    this.props.getPhotos()
  }

  render () {
    return <div style={{background: color.themeBackgroundDark}}>
      <NavBar currentRoute={this.props.currentRoute} />
      {this.props.photoClicked && <FullSizePhoto photo={this.props.photoClicked} close={() => this.props.photoOnClick(null)} />}
      <StickyContainer>
        {this.props.photos.map((blogEntry, key) => {
          return <PhotoGroup title={blogEntry.title} dayNumber={blogEntry.dayNumber} key={blogEntry._id} index={key}>
            {blogEntry.photos.map(photo => <PhotoCard
              photo={photo}
              key={photo._id}
              onError={() => this.props.removePhotoOnLoadError({blogId: blogEntry._id, _id: photo._id})}
              onClick={() => this.props.photoOnClick(photo)}
              hovered={this.props.photoHovered === photo._id}
              onMouseEnter={() => this.props.photoOnMouseEnter(photo._id)}
              onMouseLeave={() => this.props.photoOnMouseEnter(null)} />
              )
            }
          </PhotoGroup>
        })}
      </StickyContainer>
    </div>
  }
}

