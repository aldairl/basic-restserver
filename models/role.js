const { model, Schema } = require('mongoose')

const RoleSchema = new Schema({
  role: {
    type: String,
    unique: true,
    required: [true, 'role is required']
  }
})

module.exports = model('Role', RoleSchema)
