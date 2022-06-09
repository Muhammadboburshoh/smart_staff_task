const { validationResult } = require('express-validator');

const User = require('../models/users');

module.exports.postAddUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const user = new User(null, username, password, full_name);
    const newUser = await user.save();

    res.status(200).send({ message: 'Successful', newUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.postAdminCreateUser = async (req, res, next) => {
  try {
    if (req.user.role === 1) {
      const username = req.body.username;
      const password = req.body.password;
      const full_name = req.body.full_name;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const user = new User(null, username, password, full_name);
      const newUser = await user.save();

      res.status(200).send({ message: 'Successful', newUser });
    }
    else {
      res.status(401).send('Unauthorized')
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.postLoginUser = (req, res, next) => {
  res.status(200).send({ message: 'succesifully' });
  // const { username, password } = req.body;
  // if (username && password) {
  //   if (req.session.authenticated) {
  //     res.json(req.session);
  //   } else {
  //     if (password === '1232') {
  //       req.session.authenticated = true;
  //       req.session.user = {
  //         username,
  //         password
  //       };
  //       res.json(req.session);
  //     } else {
  //       res.status(403).json({ message: 'bad credentils' });
  //     }
  //   }
  // } else {
  //   res.status(403).json({ message: 'bad credentils' });
  // }
};

module.exports.getUsers = async (req, res, next) => {
  console.log(req.user);
  try {
    if (req.user) {
      const user = new User();
      const users = await user.getUsers();
      res.send(users);
    } else {
      res.status(403).send({ message: 'Not autentificated' });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
