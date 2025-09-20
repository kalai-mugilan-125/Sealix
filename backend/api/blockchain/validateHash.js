const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function validateDocumentHash(hash, documentId) {
    try {
        // Load connection profile
        const ccpPath = path.resolve(__dirname, 'connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create gateway and connect to network
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'admin',
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get network and contract
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('documentHash');

        // Query transaction
        const result = await contract.evaluateTransaction('validateHash', documentId, hash);
        
        gateway.disconnect();
        return JSON.parse(result.toString());
    } catch (error) {
        console.error(`Failed to validate hash: ${error}`);
        throw error;
    }
}

module.exports = { validateDocumentHash };