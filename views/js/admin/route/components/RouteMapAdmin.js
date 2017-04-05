import React from 'react'
import isEqual from 'lodash.isequal'

export default class RouteMapAdmin extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div style={{height: '800px', weight: '500px'}} />
  }
}

RouteMapAdmin.propTypes = {

}
