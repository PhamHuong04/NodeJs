const express = require('express');

const { newRole, updateRole, deleteRole, getRole } = require('../controllers/role-controller');

const router = express.Router();

router.post('/create-role',newRole);
router.get('/:roleID', getRole);
router.patch('/:roleID', updateRole);
router.delete('/:roleID', deleteRole);


module.exports = router;