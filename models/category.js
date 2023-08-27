const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject();
  return data;
};

module.exports = model("Category", CategorySchema);
