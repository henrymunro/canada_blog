import React from 'react'
import { Link } from 'react-router'
import color from 'styles/color'
import { Sticky } from 'react-sticky'

export default class NavBar extends React.Component {

  checkPathName (path) {
    const {currentRoute} = this.props || 'home'
    return ('/' + path === currentRoute || path === currentRoute)
  }

  render () {
    const navBarStyles = {
// position: 'fixed',
      width: '100%',
      // height: '50px',
// top: 0,
      zIndex: 2
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
      boxShadow: color.theme600 + ' 0px 0px 1px 0px inset'
    })
    
    return <div>
      <Sticky style={navBarStyles}>
        <div >
          <div className='row' style={{margin: 0, padding: 0}}>
            <Link to='home'>
              <div className='col s3 m3 l3' style={this.checkPathName('home') ? navButtonActiveStyle : navButtonStyle}>
                <div className='center-align'>HOME</div>
              </div>
            </Link>
            <Link to='aboutMe'>
              <div className='col s3 m3 l3' style={this.checkPathName('aboutMe') ? navButtonActiveStyle : navButtonStyle}>
                <div className='center-align'>ABOUT ME</div>
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
          </div>
        </div>
      </Sticky>
    </div>
  }
}

NavBar.propTypes = {
  currentRoute: React.PropTypes.string
}
