const express = require ('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.get('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;