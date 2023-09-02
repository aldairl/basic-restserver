const path = require('path')
const { response } = require('express')

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  const { file } = req.files
  const uploadPath = path.join(__dirname, '../uploads/', file.name)

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
