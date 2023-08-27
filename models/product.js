const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: { type: String },
  available: { type: Boolean, default: true }
})

ProductSchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject()
  return data
}

module.exports = model('Product', ProductSchema)
