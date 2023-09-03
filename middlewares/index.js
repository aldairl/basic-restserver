const authValidator = require('./authValidator')
const categoryValidators = require('./categoryValidators')
const userValidator = require('./userValidator')
const uploadFile = require('./uploadFiles')

module.exports = {
  ...authValidator,
  ...userValidator,
  ...categoryValidators,
  ...uploadFile
}
