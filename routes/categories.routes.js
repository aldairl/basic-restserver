const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json("all categories");
});

router.get("/:id", (req, res) => {
  res.json("get category by id");
});

router.post("/", (req, res) => {
  res.json("create category");
});

router.put("/:id", (req, res) => {
  res.json("update category");
});

router.delete("/:id", (req, res) => {
  res.json("delete category");
});

module.exports = router;
