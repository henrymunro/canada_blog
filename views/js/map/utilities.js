
export const turnRoutePointsToLines = (markers) => {
  const mappedLines = markers.map((marker, key, array) => {
    const nextMarker = array[key + 1]
    if (nextMarker) {
      const thisPoint = [marker.center[1] || marker.center.lng, marker.center[0] || marker.center.lat]
      const nextPoint = [nextMarker.center[1] || nextMarker.center.lng, nextMarker.center[0] || nextMarker.center.lat]
      return {
        'type': 'Feature',
        'properties': {
          'letter': 'Montreal',
          'color': 'blue',
          'rank': '7',
          'ascii': '71'
        },
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            thisPoint, nextPoint
          ]
        }
      }
    }
  })
  mappedLines.pop()
  return {
    'type': 'FeatureCollection',
    'features': mappedLines
  }
}

const TILE_SIZE = 256

export const latLng2World = ({lat, lng}) => {
  const sin = Math.sin(lat * Math.PI / 180)
  const x = (lng / 360 + 0.5)
  let y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI)

  y = y < -1 // eslint-disable-line
    ? -1
    : y > 1
      ? 1
      : y
  return {x, y}
}

export const world2Screen = ({x, y}, zoom) => {
  const scale = Math.pow(2, zoom)
  return {
    x: x * scale * TILE_SIZE, // TILE_SIZE = 256,
    y: y * scale * TILE_SIZE
  }
}

export const latLng2Screen = ({lat, lng}, zoom) => world2Screen(latLng2World({lat, lng}), zoom)
