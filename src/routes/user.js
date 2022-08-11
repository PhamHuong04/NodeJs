const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;