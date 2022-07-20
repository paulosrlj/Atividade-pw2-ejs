const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./config/db.config");
const messageController = require("./controllers/message");

// await db.sync();

(async () =>{
  try {
    await sequelize.sync(
      {force: false}
    );
    console.log("test");
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
})();

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
    this.app.get("/", (request, response) => {
      // views/index.ejs
      response.render("index", { entries: this.entries });
    });

    this.app.get("/new-entry", (request, response) => {
      response.render("new-entry");
    });

    this.app.post("/new-entry", (request, response) => {
      if (!request.body.title || !request.body.body) {
        response
          .status(400)
          .send("As postagens devem ter um título e um corpo.");
        return;
      }

      this.entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date(),
      });

      response.redirect("/");
    });

    this.app.use((request, response) => {
      response.status(404).render("404");
    });
  }

  async config() {
    this.app.set("views", path.resolve(__dirname, "views"));
    this.app.set("view engine", "ejs");
    this.app.locals.entries = this.entries.concat(
      messageController.messageList()
    );

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
