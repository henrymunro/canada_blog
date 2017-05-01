import React from 'react'
import isEqual from 'lodash.isequal'

export default class ResizedPhoto extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const { photo, style, size } = this.props
    console.log('RESIZE: ', size)
    // Pull out info if exists
    const {resizeURL, name, title, url} = photo || {}

    // Check all info has been passed to request specific image size
    const resizeExists = resizeURL && name && size

    // Return resized image or full image
    const photoURL = resizeExists ? `${resizeURL}\\${size}\\${name}` : url

    return <div>
      <img src={photoURL} alt={title} style={style} />
    </div>
  }
}

ResizedPhoto.propTypes = {
  photo: React.PropTypes.object,
  style: React.PropTypes.object,
  size: React.PropTypes.string

}
