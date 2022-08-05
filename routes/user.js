const express = require ('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/creatUser', UserController.newUser);
router.get('/:userID', UserController.getUser);
router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.get('/user', UserController.index);
router.get('/login', UserController.login);

module.exports = router;