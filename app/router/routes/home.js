const { logger } = require('../../logger')
const router = require('express').Router()
const loggerModule = 'home.js'

logger.info('Loading in home route', {loggerModule, startUp: true})

router.get('/', (req, res) => {
  res.status(200).send('SUCCESS HOME')
})

module.exports = router
