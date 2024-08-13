import getPrivateKeyFromCryptoName from "./getPrivateKeyFromCryptoName";
import bitcoin from 'bitcoinjs-lib';
import ECPair from 'ecpair';
import Web3 from 'web3';
import { sendTrc20Transaction } from "../crypto/Networks/TRC20";
import { sendBscTransaction } from "../crypto/Networks/BEP20";
import { sendErc20Transaction } from "../crypto/Networks/ERC20";

async function sendBitcoinTransaction(privateKey, toAddress, amount) {
    try {
        const network = bitcoin.networks.testnet;
        const keyPair = ECPair.fromWIF(privateKey, network);
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        const txb = new bitcoin.TransactionBuilder(network);
        txb.addInput('transaction_hash', 0);
        txb.addOutput(toAddress, amount);

        txb.sign(0, keyPair);

        const tx = txb.build();
        console.log(`Bitcoin transaction created: ${tx.getId()}`);
        return {
            result: true,
            txId: tx.getId(),
            hex: tx.toHex()
        };
    } catch (error) {
        console.error('Error sending Bitcoin transaction:', error);
        throw error;
    }
}

export default async function createNewTransactionFromData(networkName, data) {
    try {
        const userPrivateKey = await getPrivateKeyFromCryptoName(data.uid, data.cryptoName, networkName);
        if (!userPrivateKey.result) { throw new Error("Private key not found"); }
        const privateKey = userPrivateKey.private;
        const toAddress = data.address;
        const amount = data.amount;
        switch (networkName) {
            case 'BTC':
                return await sendBitcoinTransaction(data.uid, data.cryptoName, privateKey, toAddress, amount);
            case 'ERC20':
                return await sendErc20Transaction(data.uid, data.cryptoName, privateKey, toAddress, amount);
            case 'BSC':
                return await sendBscTransaction(data.uid, data.cryptoName, privateKey, toAddress, amount);
            case 'TRC20':
                return await sendTrc20Transaction(data.uid, data.cryptoName, privateKey, toAddress, amount);
            default:
                throw new Error("Unsupported network");
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        };
    }
}
