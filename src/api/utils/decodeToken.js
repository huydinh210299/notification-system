const jwt = require('jsonwebtoken')

const secretKey = 'huydinh-secret'

const decodeToken = token => {
  const decodedToken = jwt.verify(token, secretKey)
  return decodedToken
}

module.exports = decodeToken
