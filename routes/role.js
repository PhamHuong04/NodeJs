const express = require ('express');
const router = express.Router();
const RoleController = require('../controllers');

router.post('/creatUser', UserController.newUser);
router.get('/:userID', UserController.getUser);
router.patch('/:userID', UserController.updateUser);
router.delete('/:userID', UserController.deleteUser);
router.get('/user', UserController.index);

module.exports = router;