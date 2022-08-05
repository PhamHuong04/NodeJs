const User = require('../models/User');
const { use } = require('../routes/user');

const index = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) next(err);
        return res.status(200).json({ users });
    })
};

const getUser = async (req, res, next ) => {
    console.log('req.params ', req.params);
    const {userID} = req.params;
    const user = await User.findById(userID);
    console.log ('user info ', user);
    return res.status(200).json(user);
}

const newUser = async (req, res, next) => {
    const newUser = await User.create(req.body);
    if (!newUser) {
        console.log('Error')
    }
    res.status(200).json({
        data: {
            user: newUser
        }
    })
}

const updateUser = async (req, res, next) => {
    const { userID } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userID, newUser, { new: true })
    return res.status(200).json({ user: result })
}

const deleteUser = async (req, res, next) => {
    const { userID } = req.params;
    const result = await User.findByIdAndRemove(userID);
    return res.status(200).json({ success: true })
}

const login = async (req, res, next) => {
    
}

module.exports = {
    index,
    newUser,
    getUser,
    updateUser,
    deleteUser,
    login
}