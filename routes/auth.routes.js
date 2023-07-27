const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { loginValidator } = require("../middlewares/authValidator");

const router = Router();

router.post("/login", loginValidator, login);

module.exports = router;
