const path = require('path');

const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./utils/local');
const { port } = require('./config');

const store = new session.MemoryStore()

const app = express();

const userRoutes = require('./routes/user');

app.use(
  session({
    secret: 'secret key',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => console.log(port));
