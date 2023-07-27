const { check } = require("express-validator");
const {
  emailValidator,
  roleValidator,
  userExist,
  validate,
} = require("../helpers/dbValidators");



const userValidator = [
  check("name", "name is required").not().isEmpty(),
  check("password", "password is required at least 6 characters").isLength({
    min: 6,
  }),
  check("email", "email should be a valid email")
    .isEmail()
    .custom(emailValidator),
  check("rol", "rol is not valid").custom(roleValidator),
  validate,
];

const userUpdateValidator = [
  check("id", "id should be a valid mongoId").isMongoId(),
  check("id").custom(userExist),
  validate,
];

const deleteUserValidator = [
  check('id', 'id should be a valid mongoId').isMongoId(),
  check('id', 'id is not valid').custom(userExist),
  validate
]

module.exports = {
  userValidator,
  userUpdateValidator,
  deleteUserValidator,
};
