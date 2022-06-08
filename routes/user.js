const router = require('express').Router();
const { body } = require('express-validator');

const userController = require('../controllers/users');

router.post(
  '/signup',
  [
    body('password').trim().isLength({ min: 4 }),
    body('name').trim().not().isEmpty()
  ],
  userController.postAddUser
);

router.get('/users', userController.getUsers);

module.exports = router;
