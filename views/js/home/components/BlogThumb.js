import React from 'react'

export default class BlogThumb extends React.Component {
  render () {
    const { title, photos } = this.props.blog
    return <div className='row'>
      <div>
        <p>{title}</p>
      </div>
      <div>
        {photos[0] && <img src={photos[0].url} alt={photos[0].title} style={{height: '100px'}} />}
      </div>
    </div>
  }
}

BlogThumb.propTypes = {
  blog: React.PropTypes.object.isRequired

}
