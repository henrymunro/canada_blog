import React from 'react'
import isEqual from 'lodash.isequal'
// import color from 'styles/color'

import IconButton from 'material-ui/IconButton'

export default class SocialMediaLinks extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const type = 'logo' // round, square,
    const instagramLink = 'https://www.instagram.com/henrymunro/'
    const facebookLink = 'https://www.facebook.com/henry.munro1'
    const githubLink = 'https://github.com/henrymunro'
    const youtubeLink = 'https://www.youtube.com/channel/UCGAY_FTrdLXiGV4rUPJraLA'
    return <div>
      <div className='row' >
        <div className='col s3 m3 l3'>
          <IconButton tooltip='Instagram' href={instagramLink} target='_blank'>
            <img src={`images/svg/social-1_${type}-instagram.svg`} alt='Instagram' />
          </IconButton>
        </div>
        <div className='col s3 m3 l3'>
          <IconButton tooltip='Facebook' href={facebookLink} target='_blank'>
            <img src={`images/svg/social-1_${type}-facebook.svg`} alt='Facebook' />
          </IconButton>
        </div>
        <div className='col s3 m3 l3'>
          <IconButton tooltip='Github' href={githubLink} target='_blank'>
            <img src={`images/svg/social-1_${type}-github.svg`} alt='Github' />
          </IconButton>
        </div>
        <div className='col s3 m3 l3'>
          <IconButton tooltip='Youtube' href={youtubeLink} target='_blank'>
            <img src={`images/svg/social-1_${type}-youtube.svg`} alt='Youtube' />
          </IconButton>
        </div>
      </div>
    </div>
  }
}

SocialMediaLinks.propTypes = {

}
