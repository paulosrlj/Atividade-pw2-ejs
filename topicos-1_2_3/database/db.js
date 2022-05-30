const mongoose = require("mongoose");
// to connect to the database is necessary to create a .env file and
// put in the url to the mongo cloud database
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
