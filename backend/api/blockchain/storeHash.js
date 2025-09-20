const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

async function storeDocumentHash(hash, documentId) {
    try {
        // Load connection profile
        const ccpPath = path.resolve(__dirname, 'config/connection.yaml');
        const fileContents = fs.readFileSync(ccpPath, 'utf8');
        const ccp = yaml.load(fileContents);

        // Create wallet instance
        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

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

        // Submit transaction
        await contract.submitTransaction('StoreHash', documentId, hash);
        
        gateway.disconnect();
        return true;
    } catch (error) {
        console.error(`Failed to store hash: ${error}`);
        throw error; // Throwing the error after logging it
    }
}

module.exports = { storeDocumentHash };
