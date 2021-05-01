const jwt = require('jsonwebtoken');

const roleController = (permissions) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        let decoded_token, user_role;
        console.log(token);
        // console.log(`decoded | ${decoded_token.user}`)
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            //     console.log(decoded);
            decoded_token = decoded
        });
        console.log(`decoded info ${decoded_token.user.role}`);
        user_role = decoded_token.user.role;
        // const userRole = req.params.userRole;
        if (permissions.includes(user_role)) {
            // console.log(body);
            next();
        } else {
            // console.log(userRole);
            return res.status(401).json("You dont have permission");
        }
    }
}

module.exports = { roleController }