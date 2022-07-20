const db = require("../config/db.config");

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await db.message.findAll();

    return res.render("index", { entries: ALL });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.newEntry = async (req, res, next) => {
  try {
    return res.render("new-entry");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const MESSAGE_MODEL = {
      title: req.body.title,
      content: req.body.content,
    };

    await db.message.create(MESSAGE_MODEL);

    console.log("Message created");
    res.redirect("/");
  } catch (error) {
    return res.status(500).json(error);
  }
};

