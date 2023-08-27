const { Router } = require('express')
const { createProduct } = require('../controllers/productController')
const { isAtuh } = require('../middlewares/authValidator')
const { bodyProduct } = require('../middlewares/productValidators')

const router = Router()

router.post('/', isAtuh, bodyProduct, createProduct)

module.exports = router
