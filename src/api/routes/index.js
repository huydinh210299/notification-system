const express = require('express')
const router = express.Router()

const notificationRoutes = require('./notification.routes')

router.use('/notifications/v1', notificationRoutes)

module.exports = router
