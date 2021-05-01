const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (permissions.include(userRole)) {
            next();
        } else {
            return res.status(401).json("You dont have permission");
        }
    }
}

module.exports = { authPage }