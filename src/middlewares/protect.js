const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorization !"
        })
    }
    const decode = jwt.verify(token, "JWT_SECRET")

    const currentUser = await UserModel.findById(decode.id).populate({
        path: 'roles'
    });

    if (!currentUser) {
        return res.status(401).json({
            message: "Unauthorization !"
        })
    }
    req.user = currentUser;
    return next();
};

module.exports = protect;
