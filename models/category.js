const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'name field is required'],
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'isActive field is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user field is required']
  }
})

CategorySchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject()
  return data
}

module.exports = model('Category', CategorySchema)
