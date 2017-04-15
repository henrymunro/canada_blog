// Route point routes
const routeURI = '/blogEntryAdmin'
const BlogEntryModel = require('./../../../database/models/blogEntryModel')
const blogEntryRoutes = require('../apiRouteCreator')(BlogEntryModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(blogEntryRoutes.getEntries)
.post(blogEntryRoutes.postEntries)

  apiRoute.route(routeURI + '/multiple')
.put(blogEntryRoutes.updateMultipleEntries)

  apiRoute.route(routeURI + '/:id')
.get(blogEntryRoutes.getEntryByID)
.delete(blogEntryRoutes.deleteEntry)
.put(blogEntryRoutes.updateEntry)

  apiRoute.route(routeURI + '/dayNumber/:dayNumber')
.get(blogEntryRoutes.getEntryByParam('dayNumber'))
}
