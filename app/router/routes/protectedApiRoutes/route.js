// Route point routes
const routeURI = '/route'
const RouteModel = require('./../../../database/models/routeModel')
const routeRoutes = require('../apiRouteCreator')(RouteModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(routeRoutes.getEntries)
.post(routeRoutes.postEntries)

  apiRoute.route(routeURI + '/multiple')
.put(routeRoutes.updateMultipleEntries)

  apiRoute.route(routeURI + '/:id')
.get(routeRoutes.getEntryByID)
.delete(routeRoutes.deleteEntry)
.put(routeRoutes.updateEntry)
}
