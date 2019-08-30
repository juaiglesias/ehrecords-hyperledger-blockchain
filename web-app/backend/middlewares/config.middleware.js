const { Gateway } = require('fabric-network');

module.exports = async function (req, res, next) {
    const ccp = req.ccp;
    const wallet = req.wallet;
    const config = req.config; 
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: config.userName, discovery: config.gatewayDiscovery });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('ehrchannel');

    // Get the contract from the network.
    const contract = network.getContract('ehrecords');

    req.contract = contract;

    next();
}