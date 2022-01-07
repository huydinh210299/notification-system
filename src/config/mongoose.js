const mongoose = require('mongoose')

const { NODE_ENV } = require('../api/constants')
const { mongo, env } = require('./vars')
const logger = require('./logger')

// Exit application on error
mongoose.connection.on('error', err => {
  logger.error(`[MongoDB] connection error: ${err}`)
  process.exit(-1)
})

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true)
}

const getConnection = mongoDBConfig => {
  const { host, userName, password, replName } = mongoDBConfig
  const hostURL = host.split(' ').join(',')
  const loginOption = userName && password ? `${userName}:${password}@` : ''
  const replOption = replName ? `?replicaSet=${replName}` : ''
  return `mongodb://${loginOption}${hostURL}/${replOption}`
}

async function connect () {
  const mongoURI = getConnection(mongo)
  const dbName = env === NODE_ENV.TEST ? mongo.dbTestName : mongo.dbName
  mongoose
    .connect(mongoURI, {
      dbName: dbName,
      // useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    .then(() => console.log('[MongoDB] connected...'))
  return mongoose.connection
}

module.exports = { connect }
