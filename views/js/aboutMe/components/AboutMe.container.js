import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'
import color from 'styles/color'

import {NavBar} from '../../home'
import EmailSignUp from './EmailSignUp'
import SocialMediaLinks from './SocialMediaLinks.container'

@connect((store, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname,
    aboutMe: selectors.getAboutMe(store)
  }
}, actions)

export default class AboutMe extends React.Component {

  componentWillMount () {

  }

  render () {
    const textDivStyles = {
      background: color.theme900,
      borderRadius: '4px',
      padding: '15px'
    }

    return <div style={{background: color.themeBackgroundDark, color: color.theme50, height: '110%'}}>
      <NavBar currentRoute={this.props.currentRoute} />
      <div className='container' style={{marginTop: '40px'}}>
        <div className='row'>
          <div className='col s12 m12 l12' style={textDivStyles}>
            <div style={{padding: '20px', width: '50%', maxWidth: '350px', height: 'auto', float: 'right'}} >
              <img
                src='images/me.jpg'
                alt=''
                class='circle'
                style={{width: '100%', height: 'auto'}} />
              <SocialMediaLinks iconType='logo' color={color.theme300} />
            </div>
            <h5>Hi I’m Henry, I work for a telecoms comp… oh wait no, I’m a bicycler!</h5>
            <p>
              In April 2017 I quit my comfortable software job in London and persuaded my Dad to buy a one way flight out to Montreal Canada. From there, I told him, we’d travel west by bike with the intention of dipping our toes in the Vancouver ocean, crossing cities, mountains and everything in between. It was just crazy enough to work!
            </p>
            <p>
              Whilst we chip away at the 6000kms of trails I’ll be honing my photography and web design skills and this website is the story of our ongoing journey. Our aim is to cross the continent spending as little as possible, this will involve camping, couch surfing and I imagine a lot of pasta. I’ll be doing my best to keep track of all expense so I'll finally be able to give you all an answer that age old question ‘How much does it cost to cross Canada by bike?’. Who knows maybe some of you will look at your bank accounts and reach for your snazziest cycling sunnies, that's right the snazzier the better. Sign up below to keep up with our weekly email updates.
            </p>
          </div>
          <div className='col s12 m6 l6 hide'>
            <EmailSignUp />
          </div>
          <div className='col s12 m6 l6' />
          <div className='col s12 m12 l12'>
            <div className='container' style={{marginTop: '30px'}}>
              <div style={textDivStyles}>
                <h5>
                  This is my Dad, Steve, he says hi.
                </h5>
                <img src='images/meAndDad.jpg' alt='' class='responsive-img' style={{marginTop: '20px'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
