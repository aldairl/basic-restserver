const { googleVerify } = require("../helpers/googleVerify");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { userRoles } = require('../config/constants')

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exist
    // check if user is active
    const user = await User.findOne({ email });

    if (!user || !user.active) {
      return res.status(400).json({
        error: "email or password are incorrect",
      });
    }

    // verify password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "email or password are incorrect",
      });
    }

    // create jwt

    const payload = { uid: user.id };
    const token = generateJWT(payload);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log("[error] ", error);
    res.status(500).json({
      error: "internal error",
    });
  }
};

const google = async (req, res) => {
  const { id_token } = req.body;

  const { email, name, picture } = await googleVerify(id_token);

  // check if user exist
  let user = await User.findOne({ email });

  if (!user) {
    const data = {
      email,
      name,
      img: picture,
      password: "pass-google",
      google: true,
      rol: userRoles.user
    };
    user = new User(data);
    await user.save();
  }

  // check if user is active
  if (!user.active) {
    return res.status(401).json({
      msg: "Account is inactive, contact service",
    });
  }

  // generate token
  const payload = { uid: user.id };
  const token = generateJWT(payload);

  res.json({
    user,
    token,
  });
};

module.exports = {
  login,
  google,
};
