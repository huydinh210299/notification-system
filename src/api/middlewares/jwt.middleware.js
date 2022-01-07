const jwt = require('jsonwebtoken')

const secretKey = 'huydinh-secret'

const addPayload = (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  const payload = jwt.verify(accessToken, secretKey)
  req.payload = payload
  next()
}

module.exports = addPayload
