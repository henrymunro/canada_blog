import React from 'react'
import { connect } from 'react-redux'
// import { StickyContainer, Sticky } from 'react-sticky'
// import RaisedButton from 'material-ui/RaisedButton'
// import baseStyles from 'styles/base.css'

@connect((store) => {
  return {
    axios: store.axios.axios

  }
})
export default class Layout extends React.Component {
  componentWillMount () {

  }

  render () {
    return <div />
  }
}

