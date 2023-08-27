const { Router } = require('express')
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { isAtuh, isAdmin } = require('../middlewares/authValidator')
const { bodyProduct, prodExist, bodyUpProduct } = require('../middlewares/productValidators')

const router = Router()

router.get('/', getProducts)
router.get('/:id', prodExist, getProduct)
router.post('/', isAtuh, bodyProduct, createProduct)
router.put('/:id', isAtuh, prodExist, bodyUpProduct, updateProduct)
router.delete('/:id', isAtuh, isAdmin, prodExist, deleteProduct)
module.exports = router
