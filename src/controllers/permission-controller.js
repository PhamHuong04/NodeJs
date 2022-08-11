const Permission = require("../models/Permission");
const { permission } = require("../../src/routes/permission");

const index = (req, res, next) => {
  User.find({}, (err, permissions) => {
    if (err) next(err);
    return res.status(200).json({ permissions });
  });
};

const createPermission = async (req, res, next) => {
  const newPermission = await Permission.create(req.body);
  if (!newPermission) {
    console.log("Error");
  }
  res.status(200).json({
    data: {
      permission: newPermission,
    },
  });
};

const updatePermission = async (req, res, next) => {
  const { permissionID } = req.params;
  const newPermission = req.body;
  const result = await Permission.findByIdAndUpdate(permissionID, newPermission, { new: true });
  return res.status(200).json({ permission: result });
};

const deletePermission = async (req, res, next) => {
  const { permissionID } = req.params;
  const result = await Permission.findByIdAndRemove(permissionID);
  return res.status(200).json({ success: true });
};

const getPermission = async (req, res, next) => {
  const { permissionID } = req.params;
  const permission = await Permission.findById(permissionID);
  return res.status(200).json(permission);
};



module.exports = {
  index,
  createPermission,
  getPermission,
  updatePermission,
  deletePermission,
};
