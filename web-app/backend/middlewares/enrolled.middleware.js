const { FileSystemWallet } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var userName = config.userName;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpYAML = fs.readFileSync(ccpPath, 'utf8');
const ccp = YAML.parse(ccpYAML);

module.exports = async function (req, res, next) {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), '/wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(userName);
    if (!userExists) {
        console.log('An identity for the user ' + userName + ' does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        next(new Error('An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first'));   
    }

    req.ccp = ccp;
    req.wallet = wallet;
    req.config = config;

    next();
}