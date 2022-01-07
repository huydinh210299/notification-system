const mongoose = require('mongoose')

const { uuidValidation } = require('../validation')

const userNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
      default: ''
    },
    notificationId: {
      type: mongoose.Types.ObjectId,
      required: false,
      default: ''
    },
    // default 1 is unread
    status: {
      type: Number,
      required: false,
      default: 1
    }
  },
  { timestamps: true }
)

userNotificationSchema
  .path('userId')
  .validate(uuidValidation, 'userId must be in uuid-v4 format', String)

const UserNotification = mongoose.model(
  'user-notification',
  userNotificationSchema,
  'user-notification'
)

module.exports = UserNotification
