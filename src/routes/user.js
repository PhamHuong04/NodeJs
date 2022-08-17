const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const permisson = require('../middlewares/permission.middleware');
const protect = require('../middlewares/protect');

router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/search-age-address', UserController.searchAddressAndAge);
router.get('/search', UserController.search);
router.get('/:id', protect, permisson, UserController.findUserById);

module.exports = router;