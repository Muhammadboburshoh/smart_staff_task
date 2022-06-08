const { validationResult } = require('express-validator')

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

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = new User();
    const users = await user.getUsers();
    res.send(users  )
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
