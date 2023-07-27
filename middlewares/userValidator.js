const { check, validationResult } = require("express-validator");
const {
  emailValidator,
  roleValidator,
  userExist,
} = require("../helpers/dbValidators");

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw errors;
    return next();
  } catch (error) {
    res.status(400).json(error);
  }
};

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
  validate,
  userUpdateValidator,
  deleteUserValidator,
};
