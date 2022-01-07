const jwt = require('jsonwebtoken')
const status = require('http-status')
const getApiResponse = require('../utils/response')

const { secretKey, expireCode } = require('../mock/variable.json')

const verifyTokenTest = async (req, res, next) => {
  const accessToken = req.headers['x-access-token']

  try {
    if (!accessToken) {
      return res.sendStatus(status.UNAUTHORIZED)
    }
    const payload = jwt.verify(accessToken, secretKey)
    req.payload = payload
    next()
  } catch (error) {
    if (error && error.name === 'TokenExpiredError') {
      return res.status(expireCode).json({ msg: 'Token expired' })
    }

    return res.status(status.UNAUTHORIZED).json(
      getApiResponse({
        ec: 1,
        msg: error.message
      })
    )
  }
}

module.exports = verifyTokenTest
