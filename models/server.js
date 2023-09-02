const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')
const indexRoutes = require('../routes')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.apiPath = {
      index: '/api'
    }

    // conect database
    this.conectDatabase()
    // moddlewares
    this.middlewares()
    // routes
    this.routes()
  }

  async conectDatabase () {
    await dbConnection()
  }

  middlewares () {
    // Public folder
    this.app.use(express.static('public'))
    // CORS
    this.app.use(cors())
    // parse body
    this.app.use(express.json())
    // file upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }))
  }

  routes () {
    this.app.use(this.apiPath.index, indexRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('[server] listen in port ', this.port)
    })
  }
}

module.exports = Server
