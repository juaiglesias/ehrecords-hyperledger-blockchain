const mongoose = require('mongoose');

exports.connect = function() { 
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI, { 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useFindAndModify: false
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(process.env.MONGODB_URI);
            }
        });
    });
}