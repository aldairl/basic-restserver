const { response } = require('express')
const { isValidObjectId } = require('mongoose')

const { User, Category, Product } = require('../models')

const avaliableCollections = ['category', 'product', 'user']

const searchUser = async (query, res = response) => {
  const isMongoId = isValidObjectId(query)
  if (isMongoId) {
    const results = await User.findById(query)
    return res.json({ results })
  }

  const regExp = new RegExp(query, 'i')

  const results = await User.find({
    $or: [{ name: regExp }, { email: regExp }],
    $and: [{ active: true }]
  })

  res.json({ results })
}

const searchCategory = async (query, res = response) => {
  const isMongoId = isValidObjectId(query)
  if (isMongoId) {
    const results = await Category.findById(query)
    return res.json({ results })
  }

  const regExp = new RegExp(query, 'i')

  const results = await Category.find({ name: regExp })

  res.json({ results })
}

const searchProduct = async (query, res = response) => {
  const isMongoId = isValidObjectId(query)
  if (isMongoId) {
    const results = await Product.findById(query).populate('category', 'name') || []
    return res.json({ results })
  }

  const regExp = new RegExp(query, 'i')

  const results = await Product.find({
    $or: [{ name: regExp }, { description: regExp }],
    $and: [{ isActive: true }, { available: true }]
  }).populate('category', 'name')

  res.json({ results })
}

const search = async (req, res = response) => {
  const { collection, query } = req.params

  if (!avaliableCollections.includes(collection)) {
    res.status(400).json({
      msg: `the avaliable collections are ${avaliableCollections}`
    })
  }

  switch (collection) {
    case 'category':
      searchCategory(query, res)
      break
    case 'product':
      searchProduct(query, res)
      break
    case 'user':
      searchUser(query, res)
      break
    default:
      res.status(500).json({
        msg: 'Error in server'
      })
  }
}

module.exports = {
  search
}
