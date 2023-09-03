const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: { type: String },
  available: { type: Boolean, default: true },
  img: { type: String }
})

ProductSchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject()
  return data
}

module.exports = model('Product', ProductSchema)
