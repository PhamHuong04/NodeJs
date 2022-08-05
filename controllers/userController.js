const User = require("../models/User");

const findUser = async (option) => {
  try {
    const user = await User.findOne(option);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  const { userID } = req.params;
  const newUser = req.body;
  const result = await User.findByIdAndUpdate(userID, newUser, { new: true });
  return res.status(200).json({ user: result });
};

const deleteUser = async (req, res, next) => {
  const { userID } = req.params;
  const result = await User.findByIdAndRemove(userID);
  return res.status(200).json({ success: true });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User({ email });

    if (user.password !== password) {
      res.status(401).json({
        message: "Password is not correct !",
      });
    }
    return res.status(200).json({
      data: { user },
    });
  } catch (error) {}
};

const register = async (req, res) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      res.status(400).json({
        message: "User is existed !",
      });
    }
    const newUser = await UserModel.create(req.body);

    return res.status(201).json({
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  login,
  register,
};
