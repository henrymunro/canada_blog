
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
