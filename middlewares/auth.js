const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    const token = req.cookies.token;
    // const authHeader = req.headers['authorization'];

    // Check if token exists
    if (!token) {
        return res.render('adminLogin',{message : "UnAuthorised"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: "Token is invalid or expired" });
        }

        req.user = decoded; // store decoded info if needed later
        next();
    });
};

module.exports = {
    verifyAuth
};
