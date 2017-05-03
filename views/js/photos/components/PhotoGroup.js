import React from 'react'
import isEqual from 'lodash.isequal'
import { Sticky } from 'react-sticky'

import color from 'styles/color'

export default class PhotoGroup extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const headingStyles = {
      color: color.theme50,
      // background: color.themeBackgroundDark,
      background: `linear-gradient(${color.themeBackgroundDark} 10%, ${color.themeBackground} 90%)`,
      paddingTop: '5px',
      paddingBottom: '5px'
    }

    return <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
      <div className='row'>
        <Sticky style={{zIndex: this.props.index || 1}}>
          <div style={headingStyles}>
            <div className='container'>
              <h5>{`${this.props.title} - Day ${this.props.dayNumber}`}</h5>
            </div>
          </div>
        </Sticky>
        {this.props.children}
      </div>
    </div>
  }
}

PhotoGroup.propTypes = {
  title: React.PropTypes.string,
  dayNumber: React.PropTypes.number,
  index: React.PropTypes.number

}
