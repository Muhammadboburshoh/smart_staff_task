const router = require('express').Router();
const passport = require('passport');
const { body } = require('express-validator');

// const validateCookie = require('../middleware/cookies');
const userController = require('../controllers/users');

router.post(
  '/signup',
  [
    body('password').trim().isLength({ min: 4 }),
    body('username').trim().not().isEmpty()
  ],
  userController.postAddUser
);

router.post(
  '/admin/create',
  [
    body('password').trim().isLength({ min: 4 }),
    body('username').trim().not().isEmpty()
  ],
  userController.postAdminCreateUser
);

router.post(
  '/login',
  [
    passport.authenticate('local'),
    body('password').trim().isLength({ min: 4 }),
    body('username').trim().not().isEmpty()
  ],
  userController.postLoginUser
);

router.get('/users', userController.getUsers);

module.exports = router;
