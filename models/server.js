const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";

    // conect database
    // this.conectDatabase();
    // moddlewares
    this.middlewares();
    // routes
    this.routes();
  }

  async conectDatabase() {
    await dbConnection();
  }

  middlewares() {
    // Public folder
    this.app.use(express.static("public"));
    // CORS
    this.app.use(cors());
    // parse body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("[server] listen in port ", this.port);
    });
  }
}

module.exports = Server;
