const path = require('path')
const { v4: uuidv4 } = require('uuid')

const uploadFileHelper = (files, folder = '', validExtensions = ['jpg', 'png', 'jpeg', 'gif']) => {
  return new Promise((resolve, reject) => {
    // get file from request
    const { file } = files

    // get extension file
    const nameSplit = file.name.split('.')
    const ext = nameSplit.pop()

    // check if file has a valid extension
    if (!validExtensions.includes(ext)) {
      const error = new Error(`The file should contain a valid extension like as ${validExtensions}`)
      return reject(error)
    }

    const tempFileName = uuidv4() + '.' + ext

    // save file
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempFileName)

    file.mv(uploadPath, (error) => {
      if (error) {
        return reject(error)
      }

      resolve(tempFileName)
    })
  })
}

const validCollections = (collection, listCollections = []) => {
  if (!listCollections.includes(collection)) {
    throw new Error(`valid collections are ${listCollections}`)
  }
  return true
}

module.exports = {
  uploadFileHelper,
  validCollections
}
