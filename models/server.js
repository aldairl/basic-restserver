require("dotenv").config();
const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    // moddlewares
    this.middlewares();
    // routes
    this.routes();
  }

  middlewares() {
    // Public folder
    this.app.use(express.static("public"));
    // CORS
    this.app.use(cors());
    // parse body
    this.app.use(express.json())
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
