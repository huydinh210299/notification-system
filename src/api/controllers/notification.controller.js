const httpStatus = require('http-status')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const EventEmitter = require('events')

const getApiResponse = require('../utils/response')
const { notificationRepo, userNotificationRepo, userRepo } = require('../repo')
const { MESSAGE_TYPE } = require('../constants')
const decodeToken = require('../utils/decodeToken')

const ee = new EventEmitter()

const getNotifications = async (req, res, next) => {
  const { uid } = req.payload
  const filter = Object.assign(req.query, {
    userId: mongoose.Types.ObjectId(uid)
  })
  try {
    const { data, total } = await userNotificationRepo.getUserNotifications(
      filter
    )
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data,
        total
      })
    )
  } catch (error) {
    next(error)
  }
}

const createNotification = async (req, res, next) => {
  let { userIds, ...notificationData } = req.body
  const type = notificationData.type

  try {
    if (type === MESSAGE_TYPE.GENERAL) {
      const users = await userRepo.getUsers()
      userIds = users.map(user => user.uid)
    }
    const createdNotification = await notificationRepo.createNotification(
      notificationData
    )
    const createdUserNotification = await userNotificationRepo.createUserNotification(
      userIds,
      createdNotification._id
    )
    ee.emit('notification', createdNotification, createdUserNotification)
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: createdNotification
      })
    )
  } catch (error) {
    next(error)
  }
}

const pushNotification = (req, res) => {
  const accessToken = req.cookies.accessToken || ''
  const { uid } = decodeToken(accessToken)

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive'
  })

  ee.on('notification', (notification = {}, createdUserNotification = []) => {
    console.log(createdUserNotification, notification)
    const isNotified = createdUserNotification.filter(
      e => e.userId.toString() === uid
    )
    if (isNotified.length) {
      res.write(`data: ${notification.message}\n\n`)
    }
  })

  res.on('close', () => {
    console.log('Client closed connection')
    res.end()
  })
}

const updateNotification = async (req, res, next) => {
  const {
    params: { notificationId },
    body: updateData
  } = req
  try {
    const updatedNotification = await userNotificationRepo.updateUserNotification(
      notificationId,
      updateData
    )
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: updatedNotification
      })
    )
  } catch (error) {
    next(error)
  }
}

const index = (req, res) => {
  const index = path.join(__dirname, '../../../index.html')
  fs.createReadStream(index).pipe(res)
}

module.exports = {
  getNotifications,
  createNotification,
  pushNotification,
  updateNotification,
  index
}
