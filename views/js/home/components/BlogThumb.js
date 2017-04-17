import React from 'react'
import color from 'styles/color'

export default class BlogThumb extends React.Component {
  render () {
    const { title, photos, dayNumber, distanceKm, budget } = this.props.blog

    const imageStyle = {
      maxHeight: '200px',
      maxWidth: '100%'
    }

    const totalSpend = budget.length > 0 ? 0 : budget.reduce((acc, val) => (acc + val.total), 0)

    return <div className='row'>
      <div style={{color: 'white', background: color.theme800, padding: '5px 6px 0 6px'}}>
        <p style={{margin: '0', fontWeight: '600'}}>
          {title}
        </p>
        <div style={{fontSize: 'small', width: '100%'}}>
          <div className='row' style={{margin: 0, padding: 0}}>
            <div className='col s4 m4 l4' style={{padding: 0}}>
              Day {dayNumber}
            </div>
            <div className='col s4 m4 l4' style={{padding: 0}}>
              <div className='center-align'>
                ${totalSpend}
              </div>
            </div>
            <div className='col s4 m4 l4'>
              <div className='right-align'>
                {distanceKm}Km
              </div>
            </div>
          </div>
        </div>
        {photos[0] && <img src={photos[0].url} alt={photos[0].title} style={imageStyle} />}
      </div>
    </div>
  }
}

BlogThumb.propTypes = {
  blog: React.PropTypes.object.isRequired

}
