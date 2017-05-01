// Route point routes
const routeURI = '/photos'
const BlogEntryModel = require('./../../../database/models/blogEntryModel')
const photosRoutes = require('../apiRouteCreator')(BlogEntryModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get((req, res, next) => photosRoutes.getEntries(req, res, next, {endDate: null}, {dayNumber: -1}, {photos: 1, title: 1, dayNumber: 1}))
}
