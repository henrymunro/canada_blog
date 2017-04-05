// Route point routes
const routeURI = '/blog'
const BlogEntryModel = require('./../../../database/models/blogEntryModel')
const routeRoutes = require('../apiRouteCreator')(BlogEntryModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(routeRoutes.getEntries)

  apiRoute.route(routeURI + '/:id')
.get(routeRoutes.getEntryByID)
}
