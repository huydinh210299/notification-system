const mongo = require('./config/mongoose')
const app = require('./config/express')
const { port, env } = require('./config/vars')

mongo.connect()

app.listen(port, () => {
  console.log(`[Server] started on port ${port} (${env})`)
})
