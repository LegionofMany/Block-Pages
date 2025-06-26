import Moralis from 'moralis';

const moralisService = {
    getTransactionHistory: async (walletAddress, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.account.getTransactions({ address: walletAddress, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            console.error('Moralis getTransactionHistory error:', error?.response?.data || error);
            throw new Error(`Failed to fetch transaction history for ${walletAddress} on ${blockchainPlatform}: ${error.message}`);
        }
    },

    getBalance: async (walletAddress, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.account.getBalance({ address: walletAddress, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            console.error('Moralis getBalance error:', error?.response?.data || error);
            throw new Error(`Failed to fetch balance for ${walletAddress} on ${blockchainPlatform}: ${error.message}`);
        }
    },

    sendTransaction: async (walletAddress, recipientAddress, amount, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.account.sendTransaction({ address: walletAddress, recipient: recipientAddress, amount: amount, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            throw new Error(`Failed to send transaction from ${walletAddress} to ${recipientAddress} on ${blockchainPlatform}: ${error.message}`);
        }
    },

    getGasPrice: async (blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.utils.getGasPrice({ chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            throw new Error(`Failed to fetch gas price on ${blockchainPlatform}: ${error.message}`);
        }
    },

    estimateTransactionFee: async (walletAddress, recipientAddress, amount, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.account.estimateTransactionFee({ address: walletAddress, recipient: recipientAddress, amount: amount, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            throw new Error(`Failed to estimate transaction fee for ${walletAddress} to ${recipientAddress} on ${blockchainPlatform}: ${error.message}`);
        }
    },

    getBlockData: async (blockNumber, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.block.getBlock({ blockNumber: blockNumber, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            throw new Error(`Failed to fetch block data for block ${blockNumber} on ${blockchainPlatform}: ${error.message}`);
        }
    },

    estimateSmartContractGasCost: async (walletAddress, contractAddress, functionName, blockchainPlatform = 'eth') => {
        try {
            const response = await Moralis.EvmApi.account.estimateSmartContractGasCost({ address: walletAddress, contractAddress: contractAddress, functionName: functionName, chain: blockchainPlatform });
            return response.result;
        } catch (error) {
            throw new Error(`Failed to estimate smart contract gas cost for ${walletAddress} on ${blockchainPlatform}: ${error.message}`);
        }
    },
};

export default moralisService;