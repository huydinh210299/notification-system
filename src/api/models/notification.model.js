const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      default: ''
    },
    message: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model(
  'notification',
  notificationSchema,
  'notification'
)

module.exports = Notification
