import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import IconButton from 'material-ui/IconButton'

export default class YoutubeIcon extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const type = this.props.type || 'logo' // round, square,
    const link = this.props.link || 'https://www.Youtube.com'
    const iconColor = this.props.color || color.theme50

    const Logo = () => (
      <svg height='32px' width='32px'>
        <path fill={iconColor} d='M31.7,9.6c0,0-0.3-2.2-1.3-3.2c-1.2-1.3-2.6-1.3-3.2-1.4C22.7,4.7,16,4.7,16,4.7h0c0,0-6.7,0-11.2,0.3
  c-0.6,0.1-2,0.1-3.2,1.4c-1,1-1.3,3.2-1.3,3.2S0,12.2,0,14.8v2.4c0,2.6,0.3,5.2,0.3,5.2s0.3,2.2,1.3,3.2c1.2,1.3,2.8,1.2,3.5,1.4
  C7.7,27.2,16,27.3,16,27.3s6.7,0,11.2-0.3c0.6-0.1,2-0.1,3.2-1.4c1-1,1.3-3.2,1.3-3.2s0.3-2.6,0.3-5.2v-2.4
  C32,12.2,31.7,9.6,31.7,9.6z M12.7,20.2l0-9l8.6,4.5L12.7,20.2z' />
      </svg>
    )

    const Round = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M16,0C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M24,16.6
  c0,1.3-0.2,2.6-0.2,2.6s-0.2,1.1-0.6,1.6c-0.6,0.6-1.3,0.6-1.6,0.7c-2.2,0.2-5.6,0.2-5.6,0.2s-4.2,0-5.4-0.2c-0.4-0.1-1.2,0-1.8-0.7
  c-0.5-0.5-0.6-1.6-0.6-1.6S8,17.9,8,16.6v-1.2c0-1.3,0.2-2.6,0.2-2.6s0.2-1.1,0.6-1.6c0.6-0.6,1.3-0.6,1.6-0.7
  c2.2-0.2,5.6-0.2,5.6-0.2h0c0,0,3.4,0,5.6,0.2c0.3,0,1,0,1.6,0.7c0.5,0.5,0.6,1.6,0.6,1.6s0.2,1.3,0.2,2.6V16.6z' />
        <polygon fill={iconColor} points='14.3,18.1 18.7,15.8 14.3,13.6 ' />
      </svg>
    )

    const Square = () => (
      <svg width='32px' height='32px'>
        <polygon fill={iconColor} points='14.3,18.1 18.7,15.8 14.3,13.6 ' />
        <path fill={iconColor} d='M0,0v32h32V0H0z M24,16.6c0,1.3-0.2,2.6-0.2,2.6s-0.2,1.1-0.6,1.6c-0.6,0.6-1.3,0.6-1.6,0.7
  c-2.2,0.2-5.6,0.2-5.6,0.2s-4.2,0-5.4-0.2c-0.4-0.1-1.2,0-1.8-0.7c-0.5-0.5-0.6-1.6-0.6-1.6S8,17.9,8,16.6v-1.2
  c0-1.3,0.2-2.6,0.2-2.6s0.2-1.1,0.6-1.6c0.6-0.6,1.3-0.6,1.6-0.7c2.2-0.2,5.6-0.2,5.6-0.2h0c0,0,3.4,0,5.6,0.2c0.3,0,1,0,1.6,0.7
  c0.5,0.5,0.6,1.6,0.6,1.6s0.2,1.3,0.2,2.6V16.6z' />
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
      <IconButton tooltip='Youtube' href={link} target='_blank'>
        {render}
      </IconButton>
    </div>
  }
}

YoutubeIcon.propTypes = {
  type: React.PropTypes.string,
  link: React.PropTypes.string,
  color: React.PropTypes.string
}
