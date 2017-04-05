import React from 'react'

/**
 *  map out the route table rows and determines and set the done check box disabled
 *  if the row is not the first unchecked one
 * @param  {Object} route         Route object from the store
 * @param  {React} RouteTableRow
 * @return {Array}               Array of React components
 */
export const mapRouteTableRows = (route, RouteTableRow, onChange, onDelete, onMouseEnter) => {
  let lastDoneValue = true
  return route.map(day => {
    const doneSelectDisabled = !lastDoneValue
    lastDoneValue = day.done
    const dayProps = Object.assign({}, day, { doneSelectDisabled })
    return <RouteTableRow {...dayProps} key={day._id} onChange={(key, value) => onChange(day._id, key, value)} onDelete={onDelete} onMouseEnter={onMouseEnter} />
  })
}
