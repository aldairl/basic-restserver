const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

module.exports = {
  login,
};
