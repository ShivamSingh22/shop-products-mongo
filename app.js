// Import dotenv
require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user'); 

const errorController = require('./controllers/error');
const { mongoConnect,getDb } = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('671622f1541457e279eb97cb')
    .then((user) => {
      return user;
    })
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=> {
  console.log();
  // Use PORT from .env file
  app.listen(process.env.PORT || 5000);
});
