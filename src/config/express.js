const express = require('express')
const bodyParser = require('body-parser')
const compress = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const timeout = require('connect-timeout')
const morgan = require('morgan')

const { logs, tokenSettings } = require('./vars')
const routes = require('../api/routes')
const error = require('../api/middlewares/error')

const haltOnTimedout = (req, _res, next) => {
  if (!req.timedout) next()
}

const app = express()

app.use(timeout('5s'))

app.use(morgan(logs))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// gzip compression
app.use(compress())

app.use(cookieParser())

app.use(
  cors({
    origin: ['localhost:3001'],
    credentials: true
  })
)

app.use(cors())

app.use((req, _res, next) => {
  const container = {
    cradle: { tokenSettings }
  }
  req.container = container

  next()
})

app.use('/', routes)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

app.use(haltOnTimedout)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
