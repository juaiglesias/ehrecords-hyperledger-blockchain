const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');


// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var userName = config.userName;
var gatewayDiscovery = config.gatewayDiscovery;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpYAML = fs.readFileSync(ccpPath, 'utf8');
const ccp = YAML.parse(ccpYAML);

exports.getPatient = async function(id) {
    try {
        var response = {};

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;            
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('ehrchannel');

        // Get the contract from the network.
        const contract = network.getContract('ehrecords');

        // Evaluate the specified transaction.
        // getPatient transaction - requires arg ID
        const result = await contract.evaluateTransaction('GetPatient', id);

        response.patient = JSON.parse(result.toString());
        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);
        return response;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }

} 

exports.getAllPatients = async function() {
    try {
        var response = {};

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;            
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('ehrchannel');

        // Get the contract from the network.
        const contract = network.getContract('ehrecords');

        // Evaluate the specified transaction.
        // getPatient transaction - requires arg ID
        const result = await contract.evaluateTransaction('GetAllPatients');
        response.patients = JSON.parse(result.toString());
        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

        return response;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }

}

exports.createPatient = async function(key, firstName, lastName, age, address) {
    try {
        var response = {};

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;            
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('ehrchannel');

        // Get the contract from the network.
        const contract = network.getContract('ehrecords');

        // Evaluate the specified transaction.
        // getPatient transaction - requires arg ID
        const result = await contract.submitTransaction('CreatePatient', key, firstName, lastName, age, address);
        
        response.newPatient = JSON.parse(result.toString());

        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

        return response;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        reponse.error = error.message;
        return response;
    }
}