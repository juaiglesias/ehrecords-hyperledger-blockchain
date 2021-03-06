const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log("Checking for token...");
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if (!token) {
        next(new Error("No autorizado: Falta token"));
    } else {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                err.message = "No autorizado";
                err.status = 401;
                next(err);
            } else {
                console.log(decoded);
                req.username = decoded.username;
                next();
            }
        });
    }
}