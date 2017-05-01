import React from 'react'
import isEqual from 'lodash.isequal'

import color from 'styles/color'

export default class PhotoGroup extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
      <div className='row'>
        <h5 style={{color: color.theme50}}>{`${this.props.title} - Day ${this.props.dayNumber}`}</h5>
        {this.props.children}
      </div>
    </div>
  }
}

PhotoGroup.propTypes = {
  title: React.PropTypes.string,
  dayNumber: React.PropTypes.number

}
