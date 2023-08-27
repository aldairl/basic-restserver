const { check } = require('express-validator')
const { validate } = require('../helpers/dbValidators')

const bodyProduct = [
  check('name', 'name field is required').notEmpty(),
  check('category', 'category field should be a valid mongoId').isMongoId(),
  check('price', 'price field shoul be a numeric value').optional().isNumeric(),
  validate
]

module.exports = {
  bodyProduct
}
