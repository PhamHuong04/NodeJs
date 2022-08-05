const express = require('express');

const { getAllUser, deleteUser, updateUser, getUser, newUser } = require('../controllers/roleController');

const router = express.Router();

router.route('/getAllUsers').get(getAllUser)

router.post('/createUser', newUser);
router.get('/:userID', getUser);
router.patch('/:userID', updateUser);
router.delete('/:userID', deleteUser);


module.exports = router;