const jwt = require('jsonwebtoken');
const { logger } = require("../logger");

const roleController = (permissions) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        let decoded_token, user_role;
        logger.debug(`encoded token - ${token}`)
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            decoded_token = decoded
        });
        user_role = decoded_token.user.role;
        if (permissions.includes(user_role)) {
            logger.debug(`user logged role info - ${decoded_token.user.role}`);
            next();
        } else {
            logger.debug("You dont have permission");
            return res.status(401).json({ message: "invalid credentials" });
        }
    }
}

module.exports = { roleController }