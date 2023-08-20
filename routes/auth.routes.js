const { Router } = require("express");
const { login, google } = require("../controllers/auth.controller");
const { loginValidator, googleValidator } = require("../middlewares/authValidator");

const router = Router();

router.post("/login", loginValidator, login);
router.post('/google', googleValidator, google)

module.exports = router;
