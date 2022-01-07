const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const { customValidate, joiPagination } = require('../utils/validation')

const getNotifications = {
  query: Joi.object({
    status: Joi.boolean(),
    ...joiPagination
  })
}

const createUserNotification = {
  body: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string()
      .valid('general', 'individual')
      .required(),
    userIds: Joi.array()
      .items(
        Joi.string().guid({
          version: ['uuidv4']
        })
      )
      .when(Joi.ref('type'), {
        is: Joi.string().valid('individual'),
        then: Joi.array().items(
          Joi.string()
            .guid({
              version: ['uuidv4']
            })
            .required()
        )
      })
  })
}

const updateUserNotification = {
  body: Joi.object({
    status: Joi.number()
      .valid(0, 1)
      .required()
  })
}

module.exports = {
  getNotificationsValidate: customValidate(getNotifications),
  createNotificationValidate: customValidate(createUserNotification),
  updateNotificationValidate: customValidate(updateUserNotification)
}
