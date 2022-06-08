const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');

const app = express();

const userRoutes = require('./routes/user');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.listen(port, () => console.log(port));
