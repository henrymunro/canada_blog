// Route point routes
const routeURI = '/blogEntryAdmin'
const BlogEntryModel = require('./../../../database/models/blogEntryModel')
const blogEntryRoutes = require('../apiRouteCreator')(BlogEntryModel)

module.exports = function (apiRoute) {
  apiRoute.route(routeURI)
.get(blogEntryRoutes.getEntries)
.post(blogEntryRoutes.postEntries)

  apiRoute.route(routeURI + '/:id')
.get(blogEntryRoutes.getEntryByID)
.delete(blogEntryRoutes.deleteEntry)
.put(blogEntryRoutes.updateEntry)

  apiRoute.route(routeURI + '/dayNumber/:dayNumber')
.get(blogEntryRoutes.getEntryByParam('dayNumber'))
}

// const { logger, logError } = require('../../../logger')
// const loggerModule = 'blogEntry.js'
// const BlogEntry = require('./../../../database/models/blogEntryModel')

// logger.info('Loading in blog entry route', {loggerModule, startUp: true})

// /*
// * GET /book route to retrieve all the accounts.
// */
// function getBlogEntries (req, res) {
//   logger.debug('Request recieved to get entries', {loggerModule})
// // Query the DB and if no errors, send all the books
//   const query = BlogEntry.find({})
//   query.exec((err, output) => {
//     if (err) {
//       logError(err, 'Error getting entries', loggerModule)
//       res.send(err)
//     }
// // If no errors, send them back to the client
//     res.json(output)
//   })
// }

// /*
// * POST /account to save a new account.
// */
// function postBlogEntries (req, res) {
//   logger.debug('Request recieved to save new entry', {loggerModule})
// // Creates a new account
//   const newEntry = new BlogEntry(req.body)
// // Save it into the DB.
//   newEntry.save((err, entry) => {
//     if (err) {
//       logError(err, 'Error creating entry', loggerModule)
//       res.send(err)
//     } else { // If no errors, send it back to the client
//       res.json({ message: 'Entry successfully added!', success: true, entry })
//     }
//   })
// }

// /*
// * GET /account/:name route to retrieve a account given its username.
// */
// function getBlogEntryByDay (req, res) {
//   logger.debug('Request recieved to get entry by param', { loggerModule, dayNumber: req.params.dayNumber })
//   const query = BlogEntry.find({ dayNumber: req.params.dayNumber })
//   query.exec((err, entry) => {
//     if (err) {
//       logError(err, 'Error getting entry by param', loggerModule)
//       res.send(err)
//     }
// // If no errors, send it back to the client
//     res.json(entry)
//   })
// }

// /*
// * DELETE /Account/:id to delete a account given its id.
// */
// function deleteBlogEntry (req, res) {
//   logger.debug('Request recieved to entry by id', { loggerModule, id: req.params.id })
//   BlogEntry.remove({_id: req.params.id}, (err, result) => {
//     if (err) {
//       logError(err, 'Error deleting entry by id', loggerModule)
//       res.send(err)
//     }
//     res.json({ message: 'Entry successfully deleted!', success: true, result })
//   })
// }

// /*
// * PUT /Account/:id to update an account given its id
// */
// function updateBlogEntry (req, res) {
//   logger.debug('Request recieved update entry by id', {loggerModule, id: req.params.id})
//   BlogEntry.findById({_id: req.params.id}, (err, entry) => {
//     if (err) {
//       logError(err, 'Error updating entry by id', loggerModule)
//       res.send(err)
//     }
//     Object.assign(entry, req.body).save((err, entry) => {
//       if (err) {
//         logError(err, 'Error updating entry by id', loggerModule)
//         res.send(err)
//       }
//       res.json({ message: 'Entry updated!', success: true, entry })
//     })
//   })
// }

// // export all the functions
// module.exports = { getBlogEntries, postBlogEntries, getBlogEntryByDay, deleteBlogEntry, updateBlogEntry }

