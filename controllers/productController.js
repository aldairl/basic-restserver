const { response } = require('express')
const { Product } = require('../models')

const getProducts = async (req, res = response) => {
  const { skip = 0, limit = 10 } = req.query
  const query = { isActive: true }

  const [total, products] = await Promise.all([
    await Product.countDocuments(query),
    await Product.find(query)
      .populate('category', 'name')
      .populate('user', 'name')
      .skip(skip)
      .limit(limit)
  ])

  res.json({ products, total, skip, limit })
}

const getProduct = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('category', 'name')
    .populate('user', 'name')
  res.json(product)
}

const createProduct = async (req, res = response) => {
  const { isActive, user, name, ...prodInfo } = req.body

  const nameProd = name.toUpperCase()
  // check if product name exist
  const prodExist = await Product.findOne({ name: nameProd })

  if (prodExist) {
    return res.status(400).json({
      msg: `Product ${name} already exist`
    })
  }

  const data = {
    ...prodInfo,
    name: nameProd,
    user: req.user._id
  }
  const product = new Product(data)

  await product.save()

  res.status(201).json({ product })
}

const updateProduct = async (req, res = response) => {
  const { id } = req.params
  const { user, isActive, ...infoUp } = req.body

  if (infoUp.name) {
    infoUp.name = infoUp.name.toUpperCase()
  }
  const product = await Product.findByIdAndUpdate(id, infoUp, { new: true })

  res.json(product)
}

const deleteProduct = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true })
  res.json(`product ${product.name} was delete successfully`)
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
