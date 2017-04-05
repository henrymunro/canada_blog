// During the test the env variable is set to test
process.env.NODE_ENV = 'test_production'

// const mongoose = require('mongoose')
const Account = require('../database/models/accountModel')

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
var server = require('../app')
const should = chai.should() // eslint-disable-line 

const testAccount = {
  username: 'Test',
  password: 'password',
  admin: 0
}

chai.use(chaiHttp)
// Our parent block
describe('Authenticate', () => {
  beforeEach((done) => { // Before each test we empty the database
        // Clear the require cache to completly destroy the server
    Object.keys(require.cache).forEach(function (key) {
      if (
        /\/home\/henry\/WebDev\/canada_blog\/app/ig.test(key) && // remove only app code
        !/\/home\/henry\/WebDev\/canada_blog\/app\/database/ig.test(key) // leave DB intact
        ) { delete require.cache[key] }
    })
    process.env.NODE_ENV = 'test_production'
    server = require('../app')
    Account.remove({}, (err) => {
      if (err) console.error(err)
      done()
    })
  })
  // afterEach(function (done) {
  //   server.close(done);
  // })
  /*
    * Test the /POST route
    */
  describe('/POST authentication', () => {
    it('it should sucessfully authenticate correct credentials and pass back token', (done) => {
      const account = new Account(testAccount)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        chai.request(server)
                  .post('/api/authenticate')
                  .send(testAccount)
                  .end((err, res) => {
                    if (err) console.error(err)
                    res.should.have.status(200)
                    res.should.have.cookie('session')
                    res.body.should.be.a('object')
                    res.body.should.have.property('success').eql(true)
                    res.body.should.have.property('token')
                    done()
                  })
      })
    })

    it('it should not allow incorrect username', (done) => {
      const account = new Account(testAccount)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        chai.request(server)
                  .post('/api/authenticate')
                  .send(Object.assign({}, testAccount, {username: 'incorrectuser'}))
                  .end((err, res) => {
                    if (err) {} // Ignore error in this event as we expect 403 to trigger error
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    res.body.should.have.property('success').eql(false)
                    done()
                  })
      })
    })

    it('it should not allow incorrect password', (done) => {
      const account = new Account(testAccount)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        chai.request(server)
                  .post('/api/authenticate')
                  .send(Object.assign({}, testAccount, {password: 'incorrectpassword'}))
                  .end((err, res) => {
                    if (err) {} // Ignore error in this event as we expect 403 to trigger error
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    res.body.should.have.property('success').eql(false)
                    done()
                  })
      })
    })

    it('authentication should result in a valid session', (done) => {
      const account = new Account(testAccount)
      const agent = chai.request.agent(server)
      account.save((err, savedAccount) => {
        if (err) console.error(err)
        agent.post('/api/authenticate')
                    .send(testAccount)
                    .then((res) => {
                      res.should.have.status(200)
                      res.should.have.cookie('session')
                      return agent.get('/api/account')
                    }).then((res) => {
                      res.should.have.status(200)
                      res.body[0].should.have.property('username').eql(testAccount.username)
                      done()
                    }).catch((err) => done(err))
      })
    })
  })
})
