const { response } = require('express')
const { Product } = require('../models')

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

module.exports = {
  createProduct
}
