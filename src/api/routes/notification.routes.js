const { Router } = require('express')

const { notificationController: controller } = require('../controllers')
const { notificationValidation: validation } = require('../validation')
const addPayload = require('../middlewares/jwt.middleware')
// const { verifyToken } = require('../middlewares')

const router = Router()

router
  .route('/')
  .get(
    validation.getNotificationsValidate,
    addPayload,
    controller.getNotifications
  )

router
  .route('/')
  .post(validation.createNotificationValidate, controller.createNotification)

router
  .route('/:notificationId')
  .put(validation.updateNotificationValidate, controller.updateNotification)

router.route('/stream-notification').get(controller.pushNotification)

router.route('/index').get(controller.index)

module.exports = router
