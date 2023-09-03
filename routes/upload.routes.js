const { Router } = require('express')
const { uploadFile, updateFile } = require('../controllers/upload.controller')
const { isMongoId, validCollectionsUpload } = require('../middlewares')

const router = Router()

router.post('/', uploadFile)
router.put('/:collection/:id', validCollectionsUpload, isMongoId, updateFile)

module.exports = router
