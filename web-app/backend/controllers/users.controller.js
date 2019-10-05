const jwt = require('jsonwebtoken');
const blockchainUsersService = require('../services/blockchain.users.service');
const databaseService = require('../services/database.service');

exports.enroll = async function(req, res, next) {
    try {
        // username secret password
        const username = req.body.username;
        console.log(`Trying to enroll  user ${username}`);
        const response = await blockchainUsersService.enrollUser(username, req.body.secret);
        
        //Database registration
        await databaseService.userRegistration(username, req.body.newPassword);

        console.log(response);
        res.status(200).send({ message: response });

    } catch (err) {
        next(err);
    }

};

exports.login = async function(req, res, next) {
    try {
        const { username, password } = req.body;

        const user = await databaseService.getUser(username);

        const isCorrect = await user.isCorrectPassword(password);
        if (!isCorrect) {
            throw new Error();
        }

        //Correct login, we issue a token
        const payload = { username };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        });

        console.log(`Token of user ${req.body.username}: ${token}`);
        res.status(200).send({ token });
        
    } catch (err) {
        err.message = "Authentication problem";
        err.status = 401;
        next(err);
    }
};