const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require('express')
const { uploadFileHelper } = require('../helpers/uploadFile')
const { User, Product } = require('../models')

const uploadFile = async (req, res = response) => {
  // imagenes
  try {
    const name = await uploadFileHelper(req.files, 'textos', ['txt', 'pdf'])
    res.json({ name })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

const getFile = async (req, res = response) => {
  // get name collection and id
  const { collection, id } = req.params
  // not image Path
  const noImage = path.join(__dirname, '../assets/no-image.jpg')

  // by default mode to find is user
  let model = User

  // check if collections is products
  if (collection === 'products') {
    model = Product
  }

  // find object with id
  const objToUpdate = await model.findById(id)

  // return if not exist
  if (!objToUpdate) {
    return res.status(400).json({ msg: `not exists a ${collection} with id ${id}` })
  }

  // save path img
  const image = objToUpdate.img

  // check if exist path file
  if (image) {
    const pathImg = path.join(__dirname, '../uploads', collection, image)

    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }

  res.sendFile(noImage)
}

const updateFileCloudinary = async (req, res = response) => {
  try {
    // get name collection and id
    const { collection, id } = req.params

    // by default mode to find is user
    let model = User

    // check if collections is products
    if (collection === 'products') {
      model = Product
    }

    // find object with id
    const objToUpdate = await model.findById(id)

    // return if not exist
    if (!objToUpdate) {
      return res.status(400).json({ msg: `not exists a ${collection} with id ${id}` })
    }

    // save old path img to delete after update object
    const oldImgPath = objToUpdate.img

    // if object exist save image
    const { tempFilePath } = req.files.file
    // eslint-disable-next-line camelcase
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    // set path img to object and save
    // eslint-disable-next-line camelcase
    objToUpdate.img = secure_url
    await objToUpdate.save()

    // clean old img
    if (oldImgPath) {
      // get image id
      const [publicId] = oldImgPath.split('/').pop().split('.')
      await cloudinary.uploader.destroy(publicId)
    }

    res.json(objToUpdate)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateFile = async (req, res = response) => {
  try {
    // get name collection and id
    const { collection, id } = req.params

    // by default mode to find is user
    let model = User

    // check if collections is products
    if (collection === 'products') {
      model = Product
    }

    // find object with id
    const objToUpdate = await model.findById(id)

    // return if not exist
    if (!objToUpdate) {
      return res.status(400).json({ msg: `not exists a ${collection} with id ${id}` })
    }

    // save old path img to delete after update object
    const oldImgPath = objToUpdate.img

    // if exist save image
    const pathImg = await uploadFileHelper(req.files, collection)

    // set path img to object and save
    objToUpdate.img = pathImg
    await objToUpdate.save()

    // clean old img
    if (oldImgPath) {
      const pathImg = path.join(__dirname, '../uploads', collection, oldImgPath)

      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg)
      }
    }

    res.json(objToUpdate)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getFile,
  uploadFile,
  updateFile,
  updateFileCloudinary
}
