import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import IconButton from 'material-ui/IconButton'

export default class FacebookIcon extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const type = this.props.type || 'logo' // round, square,
    const link = this.props.link || 'https://www.facebook.com'
    const iconColor = this.props.color || color.theme50

    const Logo = () => (
      <svg height='32px' width='32px'>
        <path fill={iconColor} d='M30.7,0H1.3C0.6,0,0,0.6,0,1.3v29.3C0,31.4,0.6,32,1.3,32H17V20h-4v-5h4v-4
  c0-4.1,2.6-6.2,6.3-6.2C25.1,4.8,26.6,5,27,5v4.3l-2.6,0c-2,0-2.5,1-2.5,2.4V15h5l-1,5h-4l0.1,12h8.6c0.7,0,1.3-0.6,1.3-1.3V1.3
  C32,0.6,31.4,0,30.7,0z' />
      </svg>
    )

    const Round = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M16,0C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M20.2,10.7l-1.5,0
  c-1.2,0-1.4,0.6-1.4,1.4v1.8h2.8l-0.4,2.8h-2.4V24h-2.9v-7.3h-2.5v-2.8h2.5v-2.1C14.3,9.3,15.8,8,18,8c1,0,1.9,0.1,2.2,0.1V10.7z' />
      </svg>
    )

    const Square = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M0,0v32h32V0H0z M20.2,10.7l-1.5,0c-1.2,0-1.4,0.6-1.4,1.4v1.8h2.8l-0.4,2.8h-2.4V24h-2.9v-7.3h-2.5v-2.8
  h2.5v-2.1C14.3,9.3,15.8,8,18,8c1,0,1.9,0.1,2.2,0.1V10.7z' />
      </svg>

    )

    let render
    switch (type) {
      case 'logo':
        render = <Logo />
        break
      case 'round':
        render = <Round />
        break

      case 'square':
        render = <Square />
        break
      default:
        render = <Logo />
    }

    return <div>
      <IconButton tooltip='Facebook' href={link} target='_blank'>
        {render}
      </IconButton>
    </div>
  }
}

FacebookIcon.propTypes = {
  type: React.PropTypes.string,
  link: React.PropTypes.string,
  color: React.PropTypes.string
}
