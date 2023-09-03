const { Router } = require('express')
const { isAtuh, bodyCat, isAdmin, catId, upCategory } = require('../middlewares')
const { createCategory, getCategories, updateCategory, deleteCategory, getCategory } = require('../controllers/category.controller')

const router = Router()

router.get('/', getCategories)

router.get('/:id', catId, getCategory)

router.post('/', isAtuh, bodyCat, createCategory)

router.put('/:id', isAtuh, upCategory, catId, updateCategory)

router.delete('/:id', isAtuh, isAdmin, catId, deleteCategory)

module.exports = router
