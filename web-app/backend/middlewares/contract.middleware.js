const { getGatewayConnection } = require('../controllers/blockchain.users.controller');

module.exports = async function (req, res, next) {
    try {
        const gateway = getGatewayConnection();

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