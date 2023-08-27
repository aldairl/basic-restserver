const { Router } = require('express')
const authRoutes = require('./auth.routes')
const categoriesRoutes = require('./categories.routes')
const userRoutes = require('./user.routes')
const product = require('./product.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/categories', categoriesRoutes)
router.use('/product', product)

module.exports = router