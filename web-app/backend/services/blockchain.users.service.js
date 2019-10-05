const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var appAdmin = config.appAdmin;
var appAdminSecret = config.appAdminSecret;
var orgMSPID = config.orgMSPID;
var gatewayDiscovery = config.gatewayDiscovery;
var caName = config.caName;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpYAML = fs.readFileSync(ccpPath, 'utf8');
const ccp = YAML.parse(ccpYAML);

const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);

const getGatewayConnection = async function(identity) {
    console.log(`Getting gateway for ${identity}`);
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity, discovery: gatewayDiscovery });
    return gateway;
}
exports.getGatewayConnection = getGatewayConnection;

exports.registerUser = async function(username) {
    try {
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(username);
        if (userExists) {
            throw new Error("The user already exists");
        }

        console.log(`Trying to register user ${username}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(appAdmin);
        if (!adminExists) {
            throw new Error("Admin must be enrolled to perform the operation");
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = await getGatewayConnection(appAdmin);

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: username, role: 'client' }, adminIdentity);
        
        console.log(`Successfully registered user ${username}`);

        return `Username ${username} secret ${secret}`;

    } catch (error) {
        throw new Error(`Failed to register user ${username}. ${error}`);
    }    
}

exports.enrollUser = async function (username, secret) {
    try {
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(username);
        if (userExists) {
            throw new Error("Identity of user already exists.")
        }

        console.log(`Trying to enroll user ${username}`);

        // Connect peer node 
        const gateway = await getGatewayConnection(appAdmin);

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();

        const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });

        const userIdentity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        wallet.import(username, userIdentity);
        
        return `Successfully enrolled user ${username} and imported it into the wallet`;

    } catch(error) {
        throw new Error(`Failed to enroll user ${username}. ${error}`);
    }
}

exports.enrollAdmin = async function() {
    try {
        console.log(`Trying to enroll admin user ${appAdmin}`);
        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[caName].url;
        const ca = new FabricCAServices(caURL);

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret });
        const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        wallet.import(appAdmin, identity);
        return `Successfully enrolled admin user ${appAdmin} and imported it into the wallet`;

    } catch(error) {
        throw new Error(`Failed to enroll admin user ${appAdmin}. ${error}`);
    }
}