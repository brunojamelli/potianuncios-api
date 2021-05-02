const jwt = require('jsonwebtoken');

const roleController = (permissions) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        let decoded_token, user_role;
        console.log(`encoded token - ${token}`);
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            decoded_token = decoded
        });
        user_role = decoded_token.user.role;
        if (permissions.includes(user_role)) {
            console.log(`decoded token role info - ${decoded_token.user.role}`);
            next();
        } else {
            // console.log(userRole);
            return res.status(401).json("You dont have permission");
        }
    }
}

module.exports = { roleController }