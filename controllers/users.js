const User = require('../models/users');

module.exports.postAddUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;

  try {
    const user = new User(null, username, password, full_name);
    const newUser = await user.save();
    console.log(newUser, "abs");

    res.status(200).send({message: "Successful", newUser})
  } catch (err) {}

};
