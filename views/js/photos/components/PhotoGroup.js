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
      background: color.themeBackground,
      paddingTop: '5px',
      paddingBottom: '5px'
    }

    return <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
      <div className='row'>
        <Sticky>
          <h5 style={headingStyles}>{`${this.props.title} - Day ${this.props.dayNumber}`}</h5>
        </Sticky>
        {this.props.children}
      </div>
    </div>
  }
}

PhotoGroup.propTypes = {
  title: React.PropTypes.string,
  dayNumber: React.PropTypes.number

}
