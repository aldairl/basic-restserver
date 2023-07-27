const { validationResult } = require("express-validator");
const Role = require("../models/role");
const User = require("../models/user");

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw errors;
    return next();
  } catch (error) {
    res.status(400).json(error);
  }
};

const roleValidator = async (rol = "") => {
  const roleExist = await Role.findOne({ role: rol });
  if (!roleExist) {
    throw new Error(`${rol} is not a valid role`);
  }
};

const emailValidator = async (email = "") => {
  // check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error(`Email ${email} is already in use`);
  }
};

const userExist = async (id = "") => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`incorrect user id ${id}`);
  }
};

module.exports = {
  roleValidator,
  emailValidator,
  userExist,
  validate,
};