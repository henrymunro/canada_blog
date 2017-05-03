import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import FacebookIcon from './socialIcons/FacebookIcon'
import GithubIcon from './socialIcons/GithubIcon'
import InstagramIcon from './socialIcons/InstagramIcon'
import YoutubeIcon from './socialIcons/YoutubeIcon'

export default class SocialMediaLinks extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const instagramLink = 'https://www.instagram.com/henrymunro/'
    const facebookLink = 'https://www.facebook.com/henry.munro1'
    const githubLink = 'https://github.com/henrymunro'
    const youtubeLink = 'https://www.youtube.com/channel/UCGAY_FTrdLXiGV4rUPJraLA'

    // Set overall icon style and color
    const iconColor = this.props.color || color.theme100
    const iconType = this.props.iconType || 'logo' // round, square,
    return <div>
      <div className='row' >
        <div className='col s3 m3 l3'>
          <InstagramIcon color={iconColor} link={instagramLink} type={iconType} />
        </div>
        <div className='col s3 m3 l3'>
          <FacebookIcon color={iconColor} link={facebookLink} type={iconType} />
        </div>
        <div className='col s3 m3 l3'>
          <GithubIcon color={iconColor} link={githubLink} type={iconType} />
        </div>
        <div className='col s3 m3 l3'>
          <YoutubeIcon color={iconColor} link={youtubeLink} type={iconType} />
        </div>
      </div>
    </div>
  }
}

SocialMediaLinks.propTypes = {
  color: React.PropTypes.string,
  iconType: React.PropTypes.string

}
