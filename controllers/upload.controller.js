const { response } = require('express')
const { uploadFileHelper } = require('../helpers/uploadFile')

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // imagenes
  try {
    const name = await uploadFileHelper(req.files, 'textos', ['txt', 'pdf'])
    res.json({ name })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

module.exports = {
  uploadFile
}
