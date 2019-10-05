const User = require('../models/user.model');

exports.userRegistration = async function(username, password) {
    try {
        const user = new User({username, password});
        await user.save();
    } catch (erro) {
        throw new Error(`Failed to register user ${username} in the database. ${err}`);
    }  
}

exports.getUser = async function(username) {
    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            throw new Error("No username found with that name");
        }
        return user;
    } catch (err) {
        throw new Error(`Failed to get user: ${err}`);
    }
}