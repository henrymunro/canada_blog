import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import ResizedPhoto from './ResizedPhoto'

export default class FullSizePhoto extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const divStyle = {
      // paddingTop: '100px',
      // paddingBottom: '100px',
      height: '100%',
      width: '100%',
      position: 'fixed',
      zIndex: 10,
      background: color.themeBackground
    }

    const photoStyles = {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: window.innerHeight * 0.75
    }

    return <div className='valign-wrapper' style={divStyle} onClick={this.props.close} >
      <div className='container'>
        <div className='center-align'>
          <ResizedPhoto photo={this.props.photo} style={photoStyles} size='1000x666' onError={this.props.close} />
        </div>
      </div>
    </div>
  }
}

FullSizePhoto.propTypes = {
  photo: React.PropTypes.object,
  close: React.PropTypes.func

}
