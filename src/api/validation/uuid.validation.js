const Joi = require('joi')

const validateUUID = value => {
  const uuidSchema = Joi.string().guid({
    version: ['uuidv4']
  })
  const rs = uuidSchema.validate(value)
  if (!rs.error) return true
  return false
}

module.exports = validateUUID
