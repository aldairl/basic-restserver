const { check } = require('express-validator')
const { validate } = require('../helpers/dbValidators')
const { validCollections } = require('../helpers/uploadFile')

const fileField = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files to upload.')
  }
  next()
}

const isMongoId = [
  check('id', 'should be a valid mongoId').isMongoId(),
  validate
]

const validCollectionsUpload = [
  check('collection').custom(col => validCollections(col, ['users', 'products']))
]

module.exports = {
  fileField,
  isMongoId,
  validCollectionsUpload
}
