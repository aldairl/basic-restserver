const { response } = require('express')
const { Category } = require('../models')

const getCategories = async (req, res = response) => {
  const { skip = 0, limit = 5 } = req.query
  const queryDocs = { isActive: true }

  // make two querys to get total and docs
  const [total, categories] = await Promise.all([
    Category.countDocuments(),
    Category.find(queryDocs).populate('user', 'name').skip(skip).limit(limit)
  ])

  // return categories, total, skip and limit
  res.json({ categories, total, skip, limit })
}

const getCategory = async (req, res = response) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('user', 'name')
  res.json(category)
}

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase()

  const categoryExist = await Category.findOne({ name })

  if (categoryExist) {
    return res.status(400).json({
      msg: `Category ${name} already exist`
    })
  }

  // generate data to save
  const data = {
    name,
    user: req.user._id
  }

  const newCategory = new Category(data)
  await newCategory.save()
  res.status(201).json(name)
}

const updateCategory = async (req, res = response) => {
  const { id } = req.params
  const { user, ...catInfo } = req.body

  if (catInfo.name) {
    catInfo.name = catInfo.name.toUpperCase()
  }

  const categoryUp = await Category.findByIdAndUpdate(id, catInfo, {
    new: true
  })

  res.json(categoryUp)
}

const deleteCategory = async (req, res = response) => {
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, { isActive: false })

  res.json({ msg: `category ${category.name} deleted successfully` })
}

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}
