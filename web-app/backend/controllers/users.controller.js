const jwt = require('jsonwebtoken');
const blockchainUsersController = require('./blockchain.users.controller');
const User = require('../models/user.model');

exports.enroll = async function(username, secret, password) {
    blockchainUsersController.enrollUser(username, secret)
        .then(() => {
            //Sucessfully created enrolled the user now it must be created in the db
            const user = new User({username, password});
            user.save(function(err) {
                if (err) {
                    throw new Error("Error registering the new user, please try again.");
                } else {
                    return "The new user was created correctly";
                }
            });
        })
        .catch((err) => {
            throw err;
        });
};

exports.login = async function(username, password) {
    User.findOne({ username }, (err, user) => {
        if (err) {
            throw new Error("Internal problem, try again.");
        } else if (!user) {
            throw new Error("Incorrect username or password").status(401);
        } else {
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    throw new Error("Internal problem, try again.");
                } else if (!same) {
                    throw new Error("Incorrect username or password").status(401);
                } else {
                    //Correct login, we issue a token
                    const payload = { username };
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: '1h'
                    });
                    return token;
                }
            })
        }
    });
};