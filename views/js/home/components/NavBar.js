import React from 'react'
import { Link } from 'react-router'
import color from 'styles/color'

export default class NavBar extends React.Component {

  checkPathName (path) {
    const {currentRoute} = this.props || 'home'
    return ('/' + path === currentRoute || path === currentRoute)
  }

  render () {
    const navBarStyles = {
      position: 'fixed',
      width: this.props.width,
      height: '50px'
    }

    const navButtonStyle = {
      background: color.theme800,
      color: color.theme300,
      padding: '10px',
      boxShadow: '0px 0px 0px 1px ' + color.theme900 + ' inset'
    }

    const navButtonActiveStyle = Object.assign({}, navButtonStyle, {
      background: color.theme900,
      color: color.theme100,
      fontWeight: '500',
      boxShadow: color.theme600 + ' -1px -1px 3px 1px inset'
    })

    console.log('NAV BAR WIDTH: ', this.props.width, navBarStyles)

    return <div style={navBarStyles}>
      <div className='row' style={{margin: 0, padding: 0}}>
        <Link to='home'>
          <div className='col s3 m3 l3' style={this.checkPathName('home') ? navButtonActiveStyle : navButtonStyle}>
            <div className='center-align'>HOME</div>
          </div>
        </Link>
        <Link to='photos'>
          <div className='col s3 m3 l3' style={this.checkPathName('photos') ? navButtonActiveStyle : navButtonStyle}>
            <div className='center-align'>PHOTOS</div>
          </div>
        </Link>
        <Link to='blog'>
          <div className='col s3 m3 l3' style={this.checkPathName('blog') ? navButtonActiveStyle : navButtonStyle}>
            <div className='center-align'>BLOG</div>
          </div>
        </Link>
        <Link to='budget'>
          <div className='col s3 m3 l3' style={this.checkPathName('budget') ? navButtonActiveStyle : navButtonStyle}>
            <div className='center-align'>BUDGET</div>
          </div>
        </Link>
      </div>
    </div>
  }
}

NavBar.propTypes = {
  currentRoute: React.PropTypes.string,
  width: React.PropTypes.string.isRequired
}
