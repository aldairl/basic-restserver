const { check } = require('express-validator')
const { validate, productExist, categoryExist } = require('../helpers/dbValidators')

const bodyProduct = [
  check('name', 'name field is required').notEmpty(),
  check('category', 'category field should be a valid mongoId').isMongoId(),
  check('category').custom(categoryExist),
  check('price', 'price field shoul be a numeric value').optional().isNumeric(),
  validate
]

const bodyUpProduct = [
  check('name', 'name field is required').optional().isString(),
  check('category', 'category field should be a valid mongoId').optional().isMongoId(),
  check('category', 'category field should be a valid mongoId').optional().custom(categoryExist),
  check('price', 'price field shoul be a numeric value').optional().isNumeric(),
  check('description', 'description field shoul be a string value').optional().isString(),
  check('avaliable', 'avaliable field shoul be a boolean value').optional().isBoolean(),
  validate
]

const prodExist = [
  check('id', 'id should be a valid mongoId').isMongoId(),
  check('id').custom(productExist),
  validate
]

module.exports = {
  bodyProduct,
  prodExist,
  bodyUpProduct
}
