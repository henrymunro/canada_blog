import React from 'react'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import isEqual from 'lodash.isequal'

export default class BlogOverview extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='container'>
      <Card>
        <CardTitle title={this.props.title} subtitle={this.props.dayNumber} />
        <CardMedia>
          <div className='row'>
            <div className='col s6 m6 l6'>
              <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </div>
            <div className='col s6 m6 l6'>
              {this.props.url && <img style={{height: '200px', width: 'auto'}} src={this.props.url} />}
            </div>
          </div>
        </CardMedia>
      </Card>
    </div>
  }
}

BlogOverview.propTypes = {
  title: React.PropTypes.string.isRequired,
  dayNumber: React.PropTypes.number,
  url: React.PropTypes.string
}
