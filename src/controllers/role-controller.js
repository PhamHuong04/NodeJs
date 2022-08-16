const Role = require("../models/Role");

const index = (req, res, next) => {
  User.find({}, (err, roles) => {
    if (err) next(err);
    return res.status(200).json({ roles });
  });
};

const newRole = async (req, res, next) => {
  try {

    const newRole = await Role.create(req.body);
    if (!newRole) {
      return res.status(401).json({
        message: "error"
      })
    }
    else {
      return res.status(200).json({
        data: {
          role: newRole,
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

const updateRole = async (req, res, next) => {
  try {
    const { roleID } = req.params;
    const newRole = req.body;
    const result = await Role.findByIdAndUpdate(roleID, newRole, { new: true });
    if (result) {
      return res.status(200).json({
        role: result,
        message: "update successful"
      });
    }
    else {
      return res.status(404).json({
        message: "Role is existed !"
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { roleID } = req.params;
    const result = await Role.findByIdAndRemove(roleID);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "delete successfull"
      });
    }
    else {
      return res.status(404).json({
        message: "Role is existed !"
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};

const getRole = async (req, res, next) => {
  try {
    const { roleID } = req.params;
    const role = await Role.findById(roleID);
    return res.status(200).json(role);
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};



module.exports = {
  index,
  newRole,
  getRole,
  updateRole,
  deleteRole,
};
