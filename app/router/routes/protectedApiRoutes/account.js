// Account routes
const routeURI = '/account'
const AccountModel = require('./../../../database/models/accountModel')
const accountRoutes = require('../apiRouteCreator')(AccountModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
    .get(accountRoutes.getEntries)
    .post(accountRoutes.postEntries)

  apiRoute.route(routeURI + '/:id')
    .get(accountRoutes.getEntryByID)
    .delete(accountRoutes.deleteEntry)
    .put(accountRoutes.updateEntry)
}
