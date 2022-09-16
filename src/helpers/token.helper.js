const jwt = require("jsonwebtoken");


const signToken = (id) => {
    return jwt.sign({ id }, "JWT_SECRET", {
        expiresIn: 60 * 60 * 1000, // 1h
    });
};

const signRefreshToken = id => {
    return jwt.sign({ id }, "JWT_SECRET", {
        expiresIn: 60 * 60 * 60 * 1000,
    });
}

module.exports = {
    signToken,
    signRefreshToken
}