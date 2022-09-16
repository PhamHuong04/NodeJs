const permisson = (role) => (req, res, next) => {
    const currentUser = req.user
    const roles = currentUser.roles;

    const isAdmin = roles.some((role) => role.name.toLowerCase() === 'admin')

    if (!isAdmin) {
        return res.status(403).json({
            message: 'You are not permission !'
        })
    }

    return next();
}

module.exports = permisson