import Web3 from "web3";
import getPrivateKeyFromCryptoName from "../../api/getPrivateKeyFromCryptoName";
import getUserAddressFromCryptoName from "../../api/getAddressFromCryptoName";

export async function getBEP20WalletBalanceFromAddress(uid, cryptoName, network) {
    try {
        const userAddress = "0x" + (await getUserAddressFromCryptoName(uid, cryptoName, network)).address;
        const web3 = new Web3('https://bsc-dataseed.binance.org/');
        let balance = 0;
        const privateKey = (await getPrivateKeyFromCryptoName(uid, cryptoName, network)).private;
        if (!privateKey) throw new Error("Private key not found");
        if (cryptoName === "BNB") {
            const balanceWei = await web3.eth.getBalance(userAddress);
            balance = web3.utils.fromWei(balanceWei, 'ether');
        } else {
            const contractAddresses = {
                'USDT': '0xdac17f958d2ee523a2206206994597c13d831ec7',
                'USDC': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                'BNB': '0xB8c77482e45F1F44De1745F52C74426C631bdd52'
            };
            const contractAddress = contractAddresses[cryptoName];
            if (!contractAddress) throw new Error(`Contract address for ${cryptoName} not found`);
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(account);
            web3.eth.defaultAccount = account.address;
            const contract = new web3.eth.Contract(ERC20_ABI, contractAddress);
            const balanceWei = await contract.methods.balanceOf(userAddress).call();
            balance = web3.utils.fromWei(balanceWei, 'ether');
        }

        return {
            result: true,
            balance: balance ? balance : 0
        };
    } catch (error) {
        return {
            result: false,
            error: error.message,
            balance: 0
        };
    }
}

export async function sendBscTransaction(uid, cryptoName, privateKey, toAddress, amount) {
    try {
        const web3 = new Web3('https://bsc-dataseed.binance.org/');
        const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
        web3.eth.accounts.wallet.add(account);
        let txId = "";
        if (cryptoName === "BNB") {
            const tx = {
                from: account.address,
                to: toAddress,
                value: web3.utils.toWei(amount, 'ether'),
                gas: 21000,
                gasPrice: await web3.eth.getGasPrice()
            };
            const signedTx = await web3.eth.accounts.signTransaction(tx, "0x" + privateKey);
            txId = (await web3.eth.sendSignedTransaction(signedTx.rawTransaction)).transactionHash;
        }

        return {
            result: true,
            txId: txId
        };
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}