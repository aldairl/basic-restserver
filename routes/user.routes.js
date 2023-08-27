const { Router } = require('express')
const {
  getUsers,
  updatetUser,
  createUser,
  deleteUser
} = require('../controllers/user.controller')
const {
  userValidator,
  userUpdateValidator,
  deleteUserValidator
} = require('../middlewares/userValidator')
const { isAtuh, authWithRole } = require('../middlewares/authValidator')

const router = Router()

router.get('/', getUsers)

router.put('/:id', userUpdateValidator, updatetUser)

router.post('/', userValidator, createUser)

router.delete('/:id', isAtuh, authWithRole('USER_ROLE', 'ADMIN_ROLE'), deleteUserValidator, deleteUser)

module.exports = router
