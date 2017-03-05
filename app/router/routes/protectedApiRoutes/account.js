const { logger, logError } = require('../../../logger')
const router = require('express').Router()
const loggerModule = 'account.js'
const Account = require('./../../../database/models/accountModel')

logger.info('Loading in account route', {loggerModule, startUp: true})

router.get('/', (req, res) => {
  res.status(200).send('SUCCESS Account')
})

/*
* GET /book route to retrieve all the accounts.
*/
function getAccounts (req, res) {
  logger.debug('Request recieved to get accounts', {loggerModule})
// Query the DB and if no errors, send all the books
  const query = Account.find({})
  query.exec((err, accounts) => {
    if (err) {
      logError(err, 'Error getting account', loggerModule)
      res.send(err)
    }
// If no errors, send them back to the client
    res.json(accounts)
  })
}

/*
* POST /account to save a new account.
*/
function postAccount (req, res) {
  logger.debug('Request recieved to save new account', {loggerModule})
// Creates a new account
  const newAccount = new Account(req.body)
// Save it into the DB.
  newAccount.save((err, account) => {
    if (err) {
      logError(err, 'Error creating account', loggerModule)
      res.send(err)
    } else { // If no errors, send it back to the client
      res.json({ message: 'Account successfully added!', account })
    }
  })
}

/*
* GET /account/:name route to retrieve a account given its username.
*/
function getAccountByUsername (req, res) {
  logger.debug('Request recieved to get account by username', { loggerModule, username: req.params.username })
  const query = Account.find({ username: req.params.username })
  query.exec((err, account) => {
    if (err) {
      logError(err, 'Error getting account by username', loggerModule)
      res.send(err)
    }
// If no errors, send it back to the client
    res.json(account)
  })
}

/*
* DELETE /Account/:id to delete a account given its id.
*/
function deleteAccount (req, res) {
  logger.debug('Request recieved to delete account by id', { loggerModule, id: req.params.id })
  Account.remove({_id: req.params.id}, (err, result) => {
    if (err) {
      logError(err, 'Error getting account by username', loggerModule)
      res.send(err)
    }
    res.json({ message: 'Account successfully deleted!', result })
  })
}

/*
* PUT /Account/:id to update an account given its id
*/
function updateAccount (req, res) {
  logger.debug('Request recieved update account by id', {loggerModule, id: req.params.id})
  Account.findById({_id: req.params.id}, (err, account) => {
    if (err) {
      logError(err, 'Error getting account by username', loggerModule)
      res.send(err)
    }
    Object.assign(account, req.body).save((err, account) => {
      if (err) {
        logError(err, 'Error getting account by username', loggerModule)
        res.send(err)
      }
      res.json({ message: 'Account updated!', account })
    })
  })
}

// export all the functions
module.exports = { getAccounts, postAccount, getAccountByUsername, deleteAccount, updateAccount }

