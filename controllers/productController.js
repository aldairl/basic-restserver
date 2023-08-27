const { response } = require('express')
const { Product } = require('../models')

const getProducts = async (req, res = response) => {
  const products = await Product.find()
  res.json(products)
}

const getProduct = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
}

const createProduct = async (req, res = response) => {
  const { name, category, price, description } = req.body

  // check if product name exist
  const prodExist = await Product.findOne({ name })

  if (prodExist) {
    return res.status(400).json({
      msg: `Product ${name} already exist`
    })
  }
  const product = new Product({ name, category, price, description })

  await product.save()

  res.status(201).json({ product })
}

const updateProduct = async (req, res = response) => {
  const { id } = req.params
  const { name, price, description, category, avaliable } = req.body

  const data = { name, price, category, description, avaliable }
  const product = await Product.findByIdAndUpdate(id, data, { new: true })

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
