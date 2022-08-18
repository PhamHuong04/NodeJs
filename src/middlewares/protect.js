
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
    const currentUser = await UserModel.findById(token).populate({
        path: 'roles'
    });
    if (!currentUser) {
        return res.status(401).json({
            message: "Unthorazation !"
        })
    }
    req.user = currentUser;
    return next();
};

module.exports = protect;
