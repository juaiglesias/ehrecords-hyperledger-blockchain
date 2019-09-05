const mongoose = require('mongoose');

exports.connect = function() {
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (err) {
            throw err;
        } else {
            return process.env.MONGODB_URI;
        }
    });
}