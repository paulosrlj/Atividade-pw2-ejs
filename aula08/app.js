const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./config/db.config");

const routes = require('./routes/routes')

class App {
  app = null;
  entries = [];

  middlewares() {
    this.app.use(logger("dev"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
      next();
    })
  }

  routes() {
    this.app.use(routes);

    this.app.use((request, response) => {
      response.status(404).render("404");
    });
  }

  async config() {
    this.app.set("views", path.resolve(__dirname, "views"));
    this.app.set("view engine", "ejs");

    await db.sync();
  }

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }
}

const app = new App().app;
app.listen(3000, () => console.log("Ouvindo na porta 3000"));
