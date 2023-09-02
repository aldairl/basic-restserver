const path = require('path')
const { response } = require('express')

const { v4: uuidv4 } = require('uuid')

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // get file from request
  const { file } = req.files

  // get extension file
  const nameSplit = file.name.split('.')
  const ext = nameSplit.pop()

  // valid extensions
  const validExtensions = ['jpg', 'png', 'jpeg', 'gif']

  // check if file has a valid extension
  if (!validExtensions.includes(ext)) {
    return res.status(400).json({
      msg: `The file should contain a valid extension like as ${validExtensions}`
    })
  }

  const tempFileName = uuidv4() + '.' + ext

  // save file
  const uploadPath = path.join(__dirname, '../uploads/', tempFileName)

  file.mv(uploadPath, (error) => {
    if (error) {
      return res.status(500).json({ error })
    }

    res.json({ url: uploadPath })
  })
}

module.exports = {
  uploadFile
}
