const Notification = require('../models/notification.model')

const createNotification = async data => {
  const notification = new Notification(data)
  const createdNotification = await notification.save()
  return createdNotification
}

module.exports = {
  createNotification
}
