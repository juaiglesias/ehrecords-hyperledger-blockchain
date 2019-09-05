const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if (!token) {
        next(new Error("Unauthorized: No token").status(401));
    } else {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                next(new Error("Unauthorized: Invalid token").status(401));
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
}