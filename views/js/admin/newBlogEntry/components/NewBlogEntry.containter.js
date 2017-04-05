import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

import CoreInfo from './CoreInfo'
import NewBlogText from './NewBlogText'
import DateAndSummary from './DateAndSummary'
import NewBlogEntryPhotos from './NewBlogEntryPhotos.container'
import { MapComponent, RouteMarker, DayMarker } from '../../../map'
import blogEntriesImports, { actions as blogEntriesActions} from '../../blogEntries'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    formState: selectors.getFormState(store),
    showBlog: selectors.getShowBlog(store),
    showPhotos: selectors.getShowPhotos(store),
    dayObjects: blogEntriesImports.selectors.getDayObjects(store)
  }
}, Object.assign({}, actions, blogEntriesActions))

export default class NewBlogEntry extends React.Component {

  componentWillMount () {
    this.props.getAdminBlogEntries()
  }

  render () {
    const { lat, lng } = this.props.formState.center
    return <div>
      <NewBlogEntryPhotos />
      <Paper zDepth={2}>
        <FlatButton label='save' primary onClick={() => this.props.saveNewBlogEntry(this.props.formState)} />
        <h4>Add new day:</h4>
        <CoreInfo
          dayNumber={this.props.formState.dayNumber}
          title={this.props.formState.title}
          showBlog={this.props.showBlog}
          showPhotos={this.props.showPhotos}
          onChange={this.props.updateNewBlogEntryForm}
          toggleProp={this.props.toggleNewBlogEntryProp} />
        <DateAndSummary
          date={this.props.formState.date}
          summary={this.props.formState.summary}
          distance={this.props.formState.distance}
          onChange={this.props.updateNewBlogEntryForm}
        />
        <Divider />
        {this.props.showBlog && <NewBlogText blog={this.props.formState.blog} onChange={this.props.updateNewBlogEntryForm} />}
        <div style={{height: '300px', width: '100vw'}}>
          <MapComponent
            onGoogleApiLoaded={this.props.newBlogEntryOnGoogleApiLoaded}
            onChange={this.props.newBlogEntryOnMapChange}
            onClick={this.props.newBlogEntryOnMapClick}>
            {lat && <RouteMarker lat={lat} lng={lng} name='new' />}
            {this.props.dayObjects.map((day, key) => {
              const { lat, lng } = day.center || {}
              return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} />
            })
              }
          </MapComponent>

        </div>

      </Paper>
    </div>
  }
}

NewBlogEntry.propTypes = {

}
