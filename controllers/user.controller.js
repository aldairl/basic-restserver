const { request, response } = require("express");

const getUser = (req=request, res = response) => {
  const { page=1, limit } = req.query
  res.json({
    msg: "GET api Controller",
    page,
    limit
  });
};

const updatetUser = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "PUT api Controller",
    id
  });
};

const createUser = (req, res = response) => {

  const body = req.body;
  res.json({
    msg: "POST api Controller",
    body
  });
};

const deleteUsetUser = (req, res = response) => {
  res.json({
    msg: "DELETE api Controller",
  });
};

module.exports = {
  getUser,
  updatetUser,
  createUser,
  deleteUsetUser,
};
