const { NODE_ENV } = require('../constants')
const { env } = require('../../config/vars')

const verifyToken =
  env === NODE_ENV.TEST
    ? require('./verifyTokenTest')
    : require('express-authorization')

module.exports = {
  verifyToken
}
