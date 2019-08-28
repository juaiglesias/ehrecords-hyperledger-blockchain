const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const dateFormat = require('dateformat');


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

exports.addRecordToPatient = async function(key, information, doctorId) {
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
        throw new Error('An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first');          
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('ehrchannel');

    // Get the contract from the network.
    const contract = network.getContract('ehrecords');

    let actualDate = new Date();
    
    // Evaluate the specified transaction
    const result = await contract.submitTransaction('AddRecordToPatient', key, information, dateFormat(actualDate,"yyyy-mm-dd HH:MM"), doctorId);
    
    response.newPatient = JSON.parse(result.toString());

    console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

    return response;
}