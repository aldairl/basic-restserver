const { check } = require('express-validator')
const { validate, categoryExist } = require('../helpers/dbValidators')

const bodyCat = [
  check('name', 'name field is required').not().isEmpty(),
  validate
]

const catId = [
  check('id', 'id should by a valid mongoDBId').isMongoId(),
  check('id', 'category with this id not exist').custom(categoryExist),
  validate
]

const upCategory = [
  check('name', 'name should by a string').optional().isString(),
  validate
]

module.exports = {
  bodyCat,
  catId,
  upCategory
}
