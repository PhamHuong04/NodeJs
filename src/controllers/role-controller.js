const Role = require("../models/Role");

const index = (req, res, next) => {
  User.find({}, (err, roles) => {
    if (err) next(err);
    return res.status(200).json({ roles });
  });
};

const newRole = async (req, res, next) => {
  console.log(req.body);
  const newRole = await Role.create(req.body);
  if (!newRole) {
    console.log("Error");
  }
  res.status(200).json({
    data: {
      role: newRole,
    },
  });
};

const updateRole = async (req, res, next) => {
  const { roleID } = req.params;
  const newRole = req.body;
  const result = await Role.findByIdAndUpdate(roleID, newRole, { new: true });
  return res.status(200).json({ role: result });
};

const deleteRole = async (req, res, next) => {
  const { roleID } = req.params;
  const result = await Role.findByIdAndRemove(roleID);
  return res.status(200).json({ success: true });
};

const getRole = async (req, res, next) => {
  const { roleID } = req.params;
  const role = await Role.findById(roleID);
  return res.status(200).json(role);
};



module.exports = {
  index,
  newRole,
  getRole,
  updateRole,
  deleteRole,
};
