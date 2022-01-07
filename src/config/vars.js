const path = require('path')

require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
})

module.exports = {
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 3000,
  mongo: {
    host: process.env.MONGO_SERVER || '127.0.0.1:27017',
    replName: process.env.MONGO_REPLS || '',
    userName: process.env.MONGO_USER_NAME || '',
    password: process.env.MONGO_PASSWORD || '',
    dbName: process.env.MONGO_NAME || 'log-action',
    dbTestName: process.env.MONGO_NAME_TEST || 'log-action-test'
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  pagination: {
    page: process.env.PAGINATION_PAGE || 1,
    records: process.env.PAGINATION_RECORD || 20
  },
  tokenSettings: {
    url:
      process.env.AUTH_CALLBACK_URL ||
      'http://staging.sigmadrm.com:8080/authorization ',
    secretKey: process.env.AUTH_SECRET_KEY || 'Authorization@6889',
    expireCode: process.env.AUTH_EXPIRE_CODE || 419
  },
  userServiceUrl:
    process.env.USER_SERVICE_URL || 'http://staging.sigmadrm.com:8080/user'
}
