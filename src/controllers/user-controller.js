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
  try {
    const { userID } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userID, newUser, { new: true });
    if (result) {
      return res.status(200).json({
        user: result,
        message: "update successful"
      });
    }
    else {
      return res.status(404).json({
        message: "User is existed !"
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const result = await User.findByIdAndRemove(userID);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "delete successful"
      });
    }
    else {
      return res.status(404).json({
        message: "User is existed !"
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      message: "error"
    })
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (user.password !== password) {
      res.status(401).json({
        message: "Password is not correct !",
      });
    }
    return res.status(200).json({
      data: { user },
    });
  }
  catch (error) {
    return res.status(400).json({
      message: "error"
    });
  }
};

const register = async (req, res) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      res.status(400).json({
        message: "User is existed !",
      });
    }
    const newUser = await User.create(req.body);
    return res.status(201).json({
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "error"
    });
  }
};


module.exports = {
  updateUser,
  deleteUser,
  login,
  register,
};
