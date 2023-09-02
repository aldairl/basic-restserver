const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "rol is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...data } = this.toObject()
  return { ...data, uid: _id }
}

module.exports = model('User', userSchema)
