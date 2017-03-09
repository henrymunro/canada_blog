import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

// For permormance checking remove in prouction
import Perf from 'react-addons-perf'
window.Perf = Perf

// import Layout from './components/Layout'
import { AdminHome } from './admin'
import store from './appStore'

injectTapEventPlugin()

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <AdminHome />
  </MuiThemeProvider>
</Provider>, app)

