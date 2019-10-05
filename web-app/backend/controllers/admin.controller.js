const fs = require('fs');
const path = require('path');

const blockchainService = require('../services/blockchain.users.service');

exports.registerUser = async function(req, res, next) {
    try {
        const username = req.params.id;
        const response = await blockchainService.registerUser(username);

        console.log(response);
        res.status(200).json({ message: response });

    } catch (error) {
        next(new Error(`Failed to register user ${username}. ${error}`));
    }    
}

exports.enrollAdmin = async function(req, res, next) {
    try {
        const enrollMessage = await blockchainService.enrollAdmin();
        
        res.sendStatus(200).json({message: enrollMessage});

    } catch(error) {
        next(new Error(`Failed to enroll admin user. ${error}`));
    }
}