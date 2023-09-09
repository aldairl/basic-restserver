const { Router } = require('express')
const authRoutes = require('./auth.routes')
const categoriesRoutes = require('./categories.routes')
const userRoutes = require('./user.routes')
const product = require('./product.routes')
const search = require('./search.routes')
const upload = require('./upload.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/categories', categoriesRoutes)
router.use('/product', product)
router.use('/search', search)
router.use('/files', upload)

module.exports = router
