require('alamode')()
const webUpload = require('./web-upload')
module.exports = async (...args) => {
  let body, status
  try {
    body = await webUpload(...args)
  } catch (err) {
    body = { error: err.message, stack: err.stack }
    status = 500
  }
  return {
    status,
    body: JSON.stringify(body, null, 2),
    headers: {
      'content-type': 'application/json',
    },
  }
}