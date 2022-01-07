const axios = require('axios').default

const { userServiceUrl } = require('../../config/vars')

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjMTVhZWEwOS02MTUzLTRhMjgtYTQ3ZS1hYTliN2E3ODI0ZTUiLCJyb2xlc0lkIjpbMV0sInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE2NDE1MjI2NDEsImV4cCI6MTY0MTYwOTA0MX0.Qg2n_7yKfEBo8MVuTAxRUguPp660k7_lIKPgJ0Hsbeo'

const getUsers = async () => {
  const requestUrl = userServiceUrl
  const queryResult = await axios.get(requestUrl, {
    headers: {
      'x-access-token': accessToken
    }
  })
  return queryResult.data
}

module.exports = { getUsers }
