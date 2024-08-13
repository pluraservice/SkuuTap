import getUserAddressFromCryptoName from "../../api/getAddressFromCryptoName";
import Web3 from "web3";
import getPrivateKeyFromCryptoName from "../../api/getPrivateKeyFromCryptoName";
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    }
];

export async function createERC20Address() {
    try {
        const web3 = new Web3('https://mainnet.infura.io/v3/38bfad5d1f3c4757941c861aba1ab9df');
        const newAccount = web3.eth.accounts.create();
        return {
            result: true,
            data: {
                address: newAccount.address,
                private: newAccount.privateKey
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}

export async function getERC20WalletBalanceFromAddress(uid, cryptoName, network) {
    try {
        const userAddress = "0x" + (await getUserAddressFromCryptoName(uid, cryptoName, network)).address;
        const web3 = new Web3('https://mainnet.infura.io/v3/38bfad5d1f3c4757941c861aba1ab9df');
        let balance = 0;
        const privateKey = await getPrivateKeyFromCryptoName(uid, cryptoName, network);
        if (!privateKey) throw new Error("Private key not found");
        if (cryptoName === "ETH") {
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

export async function sendErc20Transaction(uid, cryptoName, privateKey, toAddress, amount) {
    try {
        const web3 = new Web3("https://mainnet.infura.io/v3/38bfad5d1f3c4757941c861aba1ab9df");
        let txId = "";
        const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
        web3.eth.accounts.wallet.add(account);
        if (cryptoName === "ETH") {
            const tx = {
                from: account.address,
                to: toAddress,
                value: web3.utils.toWei(amount, 'ether'),
                gas: 21000,
                gasPrice: await web3.eth.getGasPrice()
            };
            const signedTx = await web3.eth.accounts.signTransaction(tx, "0x" + privateKey);
            txId = (await web3.eth.sendSignedTransaction(signedTx.rawTransaction)).transactionHash;
        } else {
            const erc20Abi = [
                {
                    "constant": false,
                    "inputs": [
                        { "name": "_to", "type": "address" },
                        { "name": "_value", "type": "uint256" }
                    ],
                    "name": "transfer",
                    "outputs": [
                        { "name": "", "type": "bool" }
                    ],
                    "type": "function"
                }
            ];

            const contractAddresses = {
                'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48'
            };

            const contractAddress = contractAddresses[cryptoName];
            if (!contractAddress) {throw new Error('Unsupported token');}
            const tokenContract = new web3.eth.Contract(erc20Abi, contractAddress);
            const decimals = 6; 
            const amountInWei = web3.utils.toBN(amount).mul(web3.utils.toBN(10 ** decimals));
            const data = tokenContract.methods.transfer(toAddress, amountInWei).encodeABI();
            const tx = {
                from: account.address,
                to: contractAddress,
                data: data,
                gas: 200000, 
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
        };
    }
}