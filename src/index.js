require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');

const UserDetails = require('./db');
const setUpRoutes = require('./routes');

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

setUpRoutes(app);