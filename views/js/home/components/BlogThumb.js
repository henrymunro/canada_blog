import React from 'react'
import color from 'styles/color'

export default class BlogThumb extends React.Component {

  assemblePhoto (photo) {
    const imageStyle = {
      maxHeight: '200px',
      maxWidth: '100%',
      boxShadow: '0px 0px 0px 1px ' + color.theme900 + ' inset'
    }

    // Pull out info if exists
    const {resizeURL, name, title} = photo || {}
    const photoURL = `${resizeURL}\\300x200\\${name}`
    return photo && <img src={photoURL} alt={title} style={imageStyle} />
  }

  render () {
    const { title, photos, dayNumber, distanceKm, budget } = this.props.blog

    const thumbStyle = {
      color: 'white',
      background: color.theme800,
      padding: '5px 6px 0 6px',
      borderRadius: '2px'
    }

    const totalSpend = budget.length > 0 ? 0 : budget.reduce((acc, val) => (acc + val.total), 0)

    //  Pull out first four photos if they exist
    const photo1 = this.assemblePhoto(photos[0])
    const photo2 = this.assemblePhoto(photos[1])
    const photo3 = this.assemblePhoto(photos[2])
    const photo4 = this.assemblePhoto(photos[3])

    const photoDivStyles = {
      margin: 0,
      padding: 0
    }

    // If 4 photos exist present 4
    // If less than 4 but more than 2 exist show 2
    // Else show 1
    let photoTumbs = []
    if (photo4) {
      photoTumbs = [
        <div style={photoDivStyles} className='col s12 m6 l6' key='1'>{photo1}</div>,
        <div style={photoDivStyles} className='col s6 m6 l6 hide-on-small-only' key='2'>{photo2}</div>,
        <div style={photoDivStyles} className='col s6 m6 l6 hide-on-small-only' key='3'>{photo3}</div>,
        <div style={photoDivStyles} className='col s6 m6 l6 hide-on-small-only' key='4'>{photo4}</div>
      ]
    } else if (photo2) {
      photoTumbs = [
        <div style={photoDivStyles} className='col s12 m6 l6' key='1'>{photo1}</div>,
        <div style={photoDivStyles} className='col s6 m6 l6 hide-on-small-only' key='2'>{photo2}</div>
      ]
    } else {
      photoTumbs = <div style={photoDivStyles} className='col s12 m12 l12'>{photo1}</div>
    }

    return <div className='row'>
      <div style={thumbStyle}>
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
        <div className='row' style={{margin: 0, padding: 0}}>
          {photoTumbs}
        </div>
      </div>
    </div>
  }
}

BlogThumb.propTypes = {
  blog: React.PropTypes.object.isRequired

}
