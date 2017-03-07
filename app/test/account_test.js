// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// const mongoose = require('mongoose')
const Account = require('../database/models/accountModel')

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should() // eslint-disable-line 

const testAccount = {
  username: 'Test',
  password: 'password',
  admin: 1
}

chai.use(chaiHttp)
// Our parent block
describe('Account', () => {
  beforeEach((done) => { // Before each test we empty the database
    Account.remove({}, (err) => {
      if (err) console.error(err)
      done()
    })
  })
/*
  * Test the /GET route
  */
  describe('/GET account', () => {
    it('it should GET all the accounts', (done) => {
      chai.request(server)
            .get('/api/account')
            .end((err, res) => {
              if (err) console.error(err)
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(0)
              done()
            })
    })
  })

   /*
  * Test the /POST route
  */
  describe('/POST account', () => {
    it('it should POST an account ', (done) => {
      chai.request(server)
            .post('/api/account')
            .send(testAccount)
            .end((err, res) => {
              if (err) console.error(err)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('message').eql('Account successfully added!')
              res.body.account.should.have.property('username')
              res.body.account.should.have.property('password')
              res.body.account.should.have.property('admin')
              res.body.account.should.have.property('_id')
              done()
            })
    })
    it('it should not POST an account without password field', (done) => {
      const invalidAccount = {
        username: 'Test',
        admin: 1
      }
      chai.request(server)
            .post('/api/account')
            .send(invalidAccount)
            .end((err, res) => {
              if (err) console.error(err)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('errors')
              res.body.errors.should.have.property('password')
              res.body.errors.password.should.have.property('kind').eql('required')
              done()
            })
    })
  })
  /*
  * Test the /GET/:username route
  */
  describe('/GET/:username account', () => {
    it('it should GET a account by the given username', (done) => {
      const account = new Account(testAccount)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        chai.request(server)
            .get('/api/account/' + savedAccount.username)
            .send(savedAccount.username)
            .end((err, res) => {
              if (err) console.error(err)
              res.should.have.status(200)
              res.body[0].should.be.a('object')
              res.body[0].should.have.property('username').eql('Test')
              res.body[0].should.have.property('password')
              res.body[0].should.have.property('admin')
              res.body[0].should.have.property('_id').eql(String(savedAccount._id))
              done()
            })
      })
    })
  })
  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id account', () => {
    it('it should UPDATE a account given the id', (done) => {
      const account = new Account(testAccount)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        chai.request(server)
                .put('/api/account/' + savedAccount._id)
                .send(Object.assign({}, testAccount, {password: 'newPassword'}))
                .end((err, res) => {
                  if (err) console.error(err)
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message').eql('Account updated!')
                  res.body.account.should.have.property('password').eql('newPassword')
                  done()
                })
      })
    })
  })
})
