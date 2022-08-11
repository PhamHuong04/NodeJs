const express = require('express');

const { createPermission, updatePermission, deletePermission, getPermission } = require('../controllers/permission-controller');

const router = express.Router();

router.post('/create-permission', createPermission);
router.get('/:permissionID', getPermission);
router.patch('/:permissionID', updatePermission);
router.delete('/:permissionID', deletePermission);


module.exports = router;