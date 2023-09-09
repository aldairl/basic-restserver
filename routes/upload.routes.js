const { Router } = require('express')
const { uploadFile, updateFile, getFile } = require('../controllers/upload.controller')
const { isMongoId, validCollectionsUpload, isAtuh } = require('../middlewares')

// custom middlewares
const { fileField } = require('../middlewares')

const router = Router()

router.get('/:collection/:id', validCollectionsUpload, isMongoId, getFile)
router.post('/', isAtuh, fileField, uploadFile)
router.put('/:collection/:id', isAtuh, fileField, validCollectionsUpload, isMongoId, updateFile)

module.exports = router
