const router = require('express').Router();

const userController = require('../controllers/users');

router.post('/signup', userController.postAddUser);

module.exports = router;
