import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import IconButton from 'material-ui/IconButton'

export default class GithubIcon extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const type = this.props.type || 'logo' // round, square,
    const link = this.props.link || 'https://www.Github.com'
    const iconColor = this.props.color || color.theme50

    const Logo = () => (
      <svg height='32px' width='32px'>
        <path fillRule='evenodd' clipRule='evenodd' fill={iconColor} d='M16,0.4c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2
  c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1
  c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3
  c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5C23.1,6.6,24.4,7,24.4,7
  c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4
  c0,0.4,0.3,0.9,1.1,0.8C27.4,29.5,32,23.5,32,16.4C32,7.6,24.8,0.4,16,0.4z' />
      </svg>
    )

    const Round = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M16,0C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M18.3,22.4
  c0,0-1.1,0.1-2.3,0.1s-2.3-0.1-2.3-0.1C10.9,22.1,8,21,8,16.2c0-1.4,0.5-2.5,1.3-3.4c-0.1-0.3-0.6-1.6,0.1-3.3c0,0,1.1-0.3,3.4,1.3
  c1-0.3,2.1-0.4,3.1-0.4c1.1,0,2.1,0.1,3.1,0.4c2.4-1.6,3.4-1.3,3.4-1.3c0.7,1.7,0.3,3,0.1,3.3c0.8,0.9,1.3,2,1.3,3.4
  C24,21,21.1,22.1,18.3,22.4z' />
      </svg>
    )

    const Square = () => (
      <svg width='32px' height='32px'>
        <path fill={iconColor} d='M0,0v32h32V0H0z M18.3,22.4c0,0-1.1,0.1-2.3,0.1s-2.3-0.1-2.3-0.1C10.9,22.1,8,21,8,16.2
  c0-1.4,0.5-2.5,1.3-3.4c-0.1-0.3-0.6-1.6,0.1-3.3c0,0,1.1-0.3,3.4,1.3c1-0.3,2.1-0.4,3.1-0.4c1.1,0,2.1,0.1,3.1,0.4
  c2.4-1.6,3.4-1.3,3.4-1.3c0.7,1.7,0.3,3,0.1,3.3c0.8,0.9,1.3,2,1.3,3.4C24,21,21.1,22.1,18.3,22.4z' />
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
      <IconButton tooltip='Github' href={link} target='_blank'>
        {render}
      </IconButton>
    </div>
  }
}

GithubIcon.propTypes = {
  type: React.PropTypes.string,
  link: React.PropTypes.string,
  color: React.PropTypes.string
}
