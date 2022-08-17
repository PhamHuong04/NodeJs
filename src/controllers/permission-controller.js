const Permission = require("../models/Permission");

const index = (req, res, next) => {
  User.find({}, (err, permissions) => {
    if (err) next(err);
    return res.status(200).json({ permissions });
  });
};

const createPermission = async (req, res, next) => {
  try {
    const newPermission = await Permission.create(req.body);
    if (!newPermission) {
      return res.status(401).json({
        message: "error"
      })
    }
    else {
      return res.status(200).json({
        data: {
          permission: newPermission,
        },
      });
    }
  }
  catch (err) {
    res.status(400).json({
      message: "error"
    })
  }
};

const updatePermission = async (req, res, next) => {
  try {
    const { permissionID } = req.params;
    const newPermission = req.body;
    const result = await Permission.findByIdAndUpdate(permissionID, newPermission, { new: true });
    if (result) {
      return res.status(200).json({ permission: result });
    }
    else {
      return res.status(404).json({
        message: "permission is existed !"
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};

const deletePermission = async (req, res, next) => {
  try {
    const { permissionID } = req.params;
    const result = await Permission.findByIdAndRemove(permissionID);
    if (result)
      return res.status(200).json({ success: true });
    else {
      return res.status(404).json({
        message: "Permission is existed !"
      })
    }
  }
  catch (err) {
    res.status(400).json({
      message: "error"
    })
  }
};

const getPermission = async (req, res, next) => {
  try {
    const { permissionID } = req.params;
    const permission = await Permission.findById(permissionID);
    return res.status(200).json(permission);
  }
  catch(err){
    return res.status(400).json({
      message: "error"
    })
  }
};



module.exports = {
  index,
  createPermission,
  getPermission,
  updatePermission,
  deletePermission,
};
