const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {

  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT,{
    expiresIn: "4h"
  });

  return token;
};

module.exports = {
  generateJWT,
};
