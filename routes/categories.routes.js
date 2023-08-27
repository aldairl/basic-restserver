const { Router } = require('express')
const { authValidator, categoryValidators } = require('../middlewares')
const { createCategory, getCategories, updateCategory, deleteCategory, getCategory } = require('../controllers/category.controller')
const { catId, upCategory } = require('../middlewares/categoryValidators')
const { isAdmin } = require('../middlewares/authValidator')

const { isAtuh } = authValidator
const { bodyCat } = categoryValidators
const router = Router()

router.get('/', getCategories)

router.get('/:id', catId, getCategory)

router.post('/', isAtuh, bodyCat, createCategory)

router.put('/:id', isAtuh, upCategory, catId, updateCategory)

router.delete('/:id', isAtuh, isAdmin, catId, deleteCategory)

module.exports = router
