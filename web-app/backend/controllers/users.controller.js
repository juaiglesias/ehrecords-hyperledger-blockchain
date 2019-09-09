const jwt = require('jsonwebtoken');
const blockchainUsersController = require('./blockchain.users.controller');
const User = require('../models/user.model');

exports.enroll = async function(username, secret, password) {
        const response = await blockchainUsersController.enrollUser(username, secret);      
        const user = new User({username, password});
        await user.save();    
        return response;
};

exports.login = async function(username, password) {
    const user = await User.findOne({ username }).exec();

    if (!user) {
        throw new Error("Incorrect username or password"); 
    } else {
        const res = await user.isCorrectPassword(password);
        if (!res) {
            throw new Error("Incorrect username or password");
        }

        //Correct login, we issue a token
        const payload = { username };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        });
        
        return token;
    }
};