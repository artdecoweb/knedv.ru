require('alamode')()
const webUpload = require('./web-upload')

module.exports = async (context, ...args) => {
  let body, status = 200
  try {
    body = await webUpload(context, ...args)
  } catch (err) {
    body = { error: err.message, stack: err.stack }
    status = 500
  }
  context.res = {
    status,
    body: JSON.stringify(body, null, 2),
    headers: {
      'content-type': 'application/json',
    },
  }
}