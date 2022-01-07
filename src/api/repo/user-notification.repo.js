const UserNotification = require('../models/user-notification.model')
const { omitIsNil } = require('../utils/omit')

const createUserNotification = async (userIds = [], notificationId) => {
  const createdUserNotificationPromise = userIds.map(id => {
    const userNotification = new UserNotification({
      userId: id,
      notificationId
    })
    return userNotification.save()
  })
  const createdUserNotification = await Promise.all(
    createdUserNotificationPromise
  )
  return createdUserNotification
}

const getUserNotifications = async filters => {
  const { p, r, ...rest } = filters
  const filter = omitIsNil(rest)
  const [queryResult] = await UserNotification.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: 'notification',
        localField: 'notificationId',
        foreignField: '_id',
        as: 'content'
      }
    },
    { $unwind: '$content' },
    {
      $facet: {
        messages: [
          { $sort: { status: 1 } },
          { $skip: (p - 1) * r },
          { $limit: r }
        ],
        totalCount: [{ $count: 'count' }],
        unReadMsg: [
          {
            $group: {
              _id: null,
              count: { $sum: '$status' }
            }
          }
        ]
      }
    }
  ])

  const { messages, totalCount, unReadMsg } = queryResult
  const total = totalCount[0] ? totalCount[0].count : 0
  const totalUnreadMsg = unReadMsg[0] ? unReadMsg[0].count : 0
  return { data: { messages, totalUnreadMsg }, total }
}

const updateUserNotification = async (userNotificationId, updateData) => {
  const updatedUserNotification = await UserNotification.findOneAndUpdate(
    { _id: userNotificationId },
    updateData,
    { new: true }
  )
  return updatedUserNotification
}

module.exports = {
  createUserNotification,
  getUserNotifications,
  updateUserNotification
}
