const bcrypt = require('bcryptjs')

const { request, response } = require('express')
const User = require('../models/user')

const getUsers = async (req = request, res = response) => {
  const { skip = 1, limit = 5 } = req.query
  const query = { active: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(skip).limit(limit)
  ])

  res.json({
    total,
    skip,
    limit,
    users
  })
}

const updatetUser = async (req, res = response) => {
  const id = req.params.id

  const { password, google, ...userInfo } = req.body

  const user = await User.findByIdAndUpdate(id, userInfo, { new: true })

  res.json({
    user
  })
}

const createUser = async (req, res = response) => {
  const { name, email, rol, password } = req.body

  const user = new User({ name, email, rol, password })
  // encript password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)
  // save user
  await user.save()

  res.json({
    user
  })
}

const deleteUser = async (req, res = response) => {
  const { id } = req.params

  // delete phisically
  // const user = await User.findByIdAndDelete(id);

  // change status user
  const user = await User.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  )

  res.json({
    user
  })
}

module.exports = {
  getUsers,
  updatetUser,
  createUser,
  deleteUser
}
