import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// For permormance checking remove in prouction
import Perf from 'react-addons-perf'
window.Perf = Perf

// import Layout from './components/Layout'
import { AdminHome } from './admin/adminHome'
import { NewBlogEntry } from './admin/newBlogEntry'
import { BlogEntries } from './admin/blogEntries'
import { RouteComponent } from './admin/route'
import { Blog } from './blog'
import { Home } from './home'
import store from './appStore'

injectTapEventPlugin()

const app = document.getElementById('app')

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router history={history}>
      <Route component={AdminHome}>
        <Route path='/' component={Home} />
        <Route path='newBlogEntry' component={NewBlogEntry} />
        <Route path='route' component={RouteComponent} />
        <Route path='blogEntries' component={BlogEntries} />
        <Route path='blog' component={Blog} />
        <Route path='home' component={Home} />
      </Route>
    </Router>
  </MuiThemeProvider>
</Provider>, app)
/*
    <AdminHome />
*/
