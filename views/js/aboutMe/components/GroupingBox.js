import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

export default class GroupingBox extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const textDivStyles = {
      background: color.theme900,
      borderRadius: '4px',
      padding: '15px',
      height: '100%',
      width: '100%'
    }

    return <div style={textDivStyles} >
      {this.props.children}
    </div>
  }
}

GroupingBox.propTypes = {

}
