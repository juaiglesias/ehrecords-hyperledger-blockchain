const { getGatewayConnection } = require('../services/blockchain.users.service');

module.exports = async function (req, res, next) {
    try {
        console.log(`Geting contract for ${req.username}...`);
        const gateway = await getGatewayConnection(req.username);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('ehrchannel');

        // Get the contract from the network.
        const contract = network.getContract('ehrecords');

        req.contract = contract;

        next();
        
    } catch (err) {
        next(err);
    }
}