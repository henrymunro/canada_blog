import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import IconButton from 'material-ui/IconButton'

export default class InstagramIcon extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const type = this.props.type || 'logo' // round, square,
    const link = this.props.link || 'https://www.instagram.com'
    const iconColor = this.props.color || color.theme50

    const Logo = () => (
      <svg height='32px' width='32px'>
        <path fill={iconColor} d='M28.2,0H3.8C1.7,0,0,1.7,0,3.8v24.4C0,30.3,1.7,32,3.8,32h24.4c2.1,0,3.8-1.7,3.8-3.8V3.8
  C32,1.7,30.3,0,28.2,0z M24,4h3c0.6,0,1,0.4,1,1v3c0,0.6-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1V5C23,4.4,23.4,4,24,4z M16,9.9
  c3.4,0,6.2,2.7,6.2,6.1c0,3.4-2.8,6.1-6.2,6.1c-3.4,0-6.2-2.7-6.2-6.1C9.9,12.6,12.6,9.9,16,9.9z M28,29H4c-0.6,0-1-0.4-1-1V13h4
  c-0.5,0.8-0.7,2.1-0.7,3c0,5.4,4.4,9.7,9.7,9.7c5.4,0,9.7-4.4,9.7-9.7c0-0.9-0.1-2.3-0.8-3h4v15C29,28.6,28.6,29,28,29z' />
      </svg>
    )

    const Round = () => (
      <svg width='32px' height='32px'>
        <ellipse fill={iconColor} cx='16' cy='16' rx='3.1' ry='3.1' />
        <path fill={iconColor} d='M19.6,12.9h2.2c0.2,0,0.4-0.2,0.4-0.4v-2.2c0-0.2-0.2-0.4-0.4-0.4h-2.2c-0.2,0-0.4,0.2-0.4,0.4v2.2
          C19.1,12.7,19.3,12.9,19.6,12.9z' />
        <path fill={iconColor} d='M16,0C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M24,22.1c0,1-0.9,1.9-1.9,1.9
          H9.9C8.9,24,8,23.2,8,22.1V9.9C8,8.8,8.9,8,9.9,8h12.2C23.1,8,24,8.8,24,9.9V22.1z' />
        <path fill={iconColor} d='M20.9,16c0,2.7-2.2,4.9-4.9,4.9c-2.7,0-4.9-2.2-4.9-4.9c0-0.4,0.1-0.9,0.2-1.3H9.8v7c0,0.2,0.2,0.4,0.4,0.4
          h11.5c0.2,0,0.4-0.2,0.4-0.4v-7h-1.5C20.8,15.1,20.9,15.6,20.9,16z' />
      </svg>
    )

    const Square = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M20.9,16c0,2.7-2.2,4.9-4.9,4.9c-2.7,0-4.9-2.2-4.9-4.9c0-0.4,0.1-0.9,0.2-1.3H9.8v7c0,0.2,0.2,0.4,0.4,0.4
  h11.5c0.2,0,0.4-0.2,0.4-0.4v-7h-1.5C20.8,15.1,20.9,15.6,20.9,16z' />
        <path fill={iconColor} d='M19.6,12.9h2.2c0.2,0,0.4-0.2,0.4-0.4v-2.2c0-0.2-0.2-0.4-0.4-0.4h-2.2c-0.2,0-0.4,0.2-0.4,0.4v2.2
  C19.1,12.7,19.3,12.9,19.6,12.9z' />
        <ellipse fill={iconColor} cx='16' cy='16' rx='3.1' ry='3.1' />
        <path fill={iconColor} d='M0,0v32h32V0H0z M24,22.1c0,1-0.9,1.9-1.9,1.9H9.9C8.9,24,8,23.2,8,22.1V9.9C8,8.8,8.9,8,9.9,8h12.2
  C23.1,8,24,8.8,24,9.9V22.1z' />
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
      <IconButton tooltip='Instagram' href={link} target='_blank'>
        {render}
      </IconButton>
    </div>
  }
}

InstagramIcon.propTypes = {
  type: React.PropTypes.string,
  link: React.PropTypes.string,
  color: React.PropTypes.string
}
