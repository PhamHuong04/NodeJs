const express = require ('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/creatUser', UserController.newUser);
router.get('/:userID', UserController.getUser);
router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.get('/', UserController.index);

module.exports = router;