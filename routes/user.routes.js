const { Router } = require("express");
const {
  getUser,
  updatetUser,
  createUser,
  deleteUsetUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUser);

router.put("/:id", updatetUser);

router.post("/", createUser);

router.delete("/", deleteUsetUser);

module.exports = router;
