import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { StickyContainer } from 'react-sticky'

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
import store from './adminStore'

injectTapEventPlugin()

const app = document.getElementById('app')

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <StickyContainer>
      <Router history={history}>
        <Route component={AdminHome}>
          <Route path='/admin' component={Home} />
          <Route path='/admin/newBlogEntry' component={NewBlogEntry} />
          <Route path='/admin/route' component={RouteComponent} />
          <Route path='/admin/blogEntries' component={BlogEntries} />
          <Route path='/admin/blog' component={Blog} />
          <Route path='/admin/home' component={Home} />
        </Route>
      </Router>
    </StickyContainer>
  </MuiThemeProvider>
</Provider>, app)
/*
    <AdminHome />
*/
