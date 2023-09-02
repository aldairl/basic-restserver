const { Router } = require('express')
const { uploadFile } = require('../controllers/upload.controller')

const router = Router()

router.post('/', uploadFile)

module.exports = router
