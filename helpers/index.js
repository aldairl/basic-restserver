const dbValidators = require('./dbValidators')
const googleVerify = require('./googleVerify')
const jwt = require('./jwt')
const uploadFile = require('./uploadFile')

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwt,
  ...uploadFile
}
