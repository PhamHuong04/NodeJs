const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");

const signToken = (id) => {
  return jwt.sign({ id }, "JWT_SECRET", {
    expiresIn: 60 * 60 * 1000, // 1h
  });
};

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
        message: "update successful",
      });
    } else {
      return res.status(404).json({
        message: "User is existed !",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const result = await User.findByIdAndRemove(userID);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "delete successful",
      });
    } else {
      return res.status(404).json({
        message: "User is existed !",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User is not existed !",
      });
    }

    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      return res.status(400).json({
        message: "Password is incorrect !",
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      data: { user, accessToken: token },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error",
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
    // tim role có name la User
    const roleUser = await Role.findOne({ name: "User" });
    console.log(roleUser._id);
    const roles = [roleUser._id];
    // set mặc định mỗi user có 1 role là "User"
    const newUser = await User.create({ ...req.body, roles });
    const token = signToken(user._id);
    return res.status(201).json({
      data: {
        user: newUser,
        accessToken: token
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error",
    });
  }
};

const searchAddressAndAge = async (req, res) => {
  const page = 1;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  const users = await UserModel.find(
    {
      age: {
        $gt: 20,
      },
    },
    {
      "address.name": "Ha Dong",
    }
  )
    .select("name age address")
    .limit(perPage)
    .skip(skip);

  res.json({
    data: {
      results: users.length,
      users,
    },
  });
};

const search = async (req, res) => {
  const page = 1
  const limit = 5;
  const skip = (page - 1) * limit;
  const users = await User.find(req.query).populate({
    path: "roles",
    populate: {
      path: "permissions"
    }
  }).skip(skip).limit(limit);

  return res.json({
    users
  })
};

const searchRoleAndPermission = async (req, res) => { };

const findUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "roles",
    populate: {
      path: "permissions"
    }
  });

  return res.status(200).json({
    data: {
      user,
    },
  });
};

module.exports = {
  updateUser,
  deleteUser,
  login,
  register,
  searchAddressAndAge,
  search,
  findUserById,
};
