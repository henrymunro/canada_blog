// Route point routes
const routeURI = '/emailSignUp'
const EmailSignUpModel = require('./../../../database/models/emailSignUpModel')
const emailSignUpRoutes = require('../apiRouteCreator')(EmailSignUpModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.post(emailSignUpRoutes.postEntries)
}
