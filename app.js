// Import dotenv
require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const User = require("./models/user");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67185c9b3a989fb78ffa92de")
    .then((user) => {
      return user;
    })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URL)
  
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({ name: "Max", email: "test@test.com", cart: { items: [] } });
        return user.save();
      }
    });
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
