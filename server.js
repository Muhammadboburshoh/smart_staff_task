const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')

const { port } = require('./config');

const app = express();

const userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => console.log(port));
