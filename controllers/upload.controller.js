const path = require('path')
const fs = require('fs')

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

  res.json({ msg: `${collection} doesn't has an image` })
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
  updateFile
}
