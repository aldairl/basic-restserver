const jwt = require('jsonwebtoken')

const { check } = require('express-validator')
const { validate } = require('../helpers/dbValidators')
const { request, response } = require('express')
const User = require('../models/user')

const loginValidator = [
  check('email', 'email is required').isEmail(),
  check('password', 'password is requiered').not().isEmpty(),
  validate
]

const googleValidator = [
  check('id_token', 'id_token is requiered').not().isEmpty(),
  validate
]

/** Check id user is authenticated */
const isAtuh = async (req = request, res = response, next) => {
  try {
    // Bearer token
    const authorization = req.header('authorization')

    if (!authorization) throw new Error('')

    const [, token] = authorization.split(' ')
    const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT)
    const user = await User.findById(uid)

    if (!user || !user.active) throw new Error('')

    req.user = user
    next()
  } catch (error) {
    console.log('[error]', error)
    res.status(401).json({
      error: 'Please authenticate'
    })
  }
}

const isAdmin = (req = request, res = response, next) => {
  try {
    if (!req.user) throw new Error('Please authenticate')

    const { rol } = req.user
    if (rol !== 'ADMIN_ROLE') throw new Error('Permission denied')

    next()
  } catch (error) {
    console.log('[error]', error)
    res.status(401).json({
      error: error.message
    })
  }
}

const authWithRole = (...roles) => {
  return (req = request, res = response, next) => {
    try {
      if (!req.user) throw new Error('Please authenticate')

      const { rol } = req.user

      if (!roles.includes(rol)) throw new Error('Permission denied')

      next()
    } catch (error) {
      console.log('[error]', error)
      res.status(403).json({
        error: error.message
      })
    }
  }
}

module.exports = {
  loginValidator,
  isAtuh,
  isAdmin,
  authWithRole,
  googleValidator
}
