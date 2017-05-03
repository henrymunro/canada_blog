// Route point routes
const routeURI = '/email'
const EmailSignUpModel = require('./../../../database/models/emailSignUpModel')
const emailSignUpRoutes = require('../apiRouteCreator')(EmailSignUpModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(emailSignUpRoutes.getEntries)
}
