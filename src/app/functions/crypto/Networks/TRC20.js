import TronWeb from "tronweb";
import getPrivateKeyFromCryptoName from "../../api/getPrivateKeyFromCryptoName";
import { v4 as uuidV4 } from "uuid";

export async function createTRC20Address() {
    try {
        const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io' });
        const resCreateTRC20Wallet = await tronWeb.createAccount();
        return {
            result: true,
            data: {
                address: resCreateTRC20Wallet.address.base58,
                private: resCreateTRC20Wallet.privateKey
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}

export async function getTRC20WalletBalanceFromAddress(uid, cryptoName, network) {
    try {
        const userPrivateKey = await getPrivateKeyFromCryptoName(uid, cryptoName, network);
        if (!userPrivateKey.result) { throw new Error("Private key not found"); }
        const privateKey = userPrivateKey.private;
        const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io', privateKey: privateKey });
        let balance = 0;
        if (cryptoName === "TRX") {
            const balanceInSun = await tronWeb.trx.getBalance(tronWeb.defaultAddress.base58);
            balance = balanceInSun / 1e6; 
        } else if (cryptoName === "USDT") {
            const usdtContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
            const { abi } = await tronWeb.trx.getContract(usdtContractAddress);
            const contract = tronWeb.contract(abi.entrys, usdtContractAddress);
            const balanceNumberWithoutDivision = await contract.methods.balanceOf(tronWeb.defaultAddress.base58).call();
            balance = balanceNumberWithoutDivision / 1e6; 
        }

        return {
            result: true,
            balance: balance 
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function getConfirmedTransaction(tronWeb, txId) {
    let confirmed = false;
    while (!confirmed) { 
        try {
            const transactionInfo = await tronWeb.trx.getConfirmedTransaction(txId);
            console.log(transactionInfo)
            if (transactionInfo.ret && transactionInfo.ret[0].contractRet === "SUCCESS") {
                confirmed = true;
            } else {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

export async function sendTrc20Transaction(uid, cryptoName, privateKey, toAddress, amount) {
    try {
        if (cryptoName === "TRX") {
            const tronWebMain = new TronWeb({
                fullHost: "https://api.trongrid.io",
                privateKey: "3930e9c85aca0ec2f6403f6b917e5529a8d00c0a3dd5e2fa4064c50430cddc26"
            });
    
            const tronWeb = new TronWeb({
                fullHost: "https://api.trongrid.io",
                privateKey: privateKey
            });
    
            const tronWebMainAddress = tronWebMain.defaultAddress.base58;
            const fromAddress = tronWeb.defaultAddress.base58;
            const toAddressTRX = fromAddress;

            const sendAmountCommission = 10 * 1e6;
            const sendTransactionCommission = await tronWeb.transactionBuilder.sendTrx(tronWebMainAddress, sendAmountCommission);
            const signedSendTransactionCommission = await tronWeb.trx.sign(sendTransactionCommission);
            const broadcastSendTransactionCommission = await tronWeb.trx.sendRawTransaction(signedSendTransactionCommission);
            if (!broadcastSendTransactionCommission.result) throw new Error("Invio TRX fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWeb, broadcastSendTransactionCommission.txid);
    
            const sendAmount = amount * 1e6;
            const sendTransaction = await tronWeb.transactionBuilder.sendTrx(toAddressTRX, sendAmount, tronWebMainAddress);
            const signedSendTransaction = await tronWeb.trx.sign(sendTransaction);
            const broadcastSendTransaction = await tronWeb.trx.sendRawTransaction(signedSendTransaction);
            if (!broadcastSendTransaction.result) throw new Error("Invio TRX fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWeb, broadcastSendTransaction.txid);

            await set(ref(FirebaseDatabase, `usersInfo/${uid}/movement`, {
                type: "positive",
                message: `Hai inviato con Successo ${amount} USDT a ${toAddress}`,
                id: uuidV4()
            }))
        } else {
            const tronWebMain = new TronWeb({
                fullHost: "https://api.trongrid.io",
                privateKey: "3930e9c85aca0ec2f6403f6b917e5529a8d00c0a3dd5e2fa4064c50430cddc26"
            });
    
            const tronWeb = new TronWeb({
                fullHost: "https://api.trongrid.io",
                privateKey: privateKey
            });
    
            const usdtContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
            const tronWebMainAddress = tronWebMain.defaultAddress.base58;
            const fromAddress = tronWeb.defaultAddress.base58;
            const toAddressTRX = fromAddress;
    
            const sendAmount = 30 * 1e6;
            const sendTransaction = await tronWebMain.transactionBuilder.sendTrx(toAddressTRX, sendAmount, tronWebMainAddress);
            const signedSendTransaction = await tronWebMain.trx.sign(sendTransaction);
            const broadcastSendTransaction = await tronWebMain.trx.sendRawTransaction(signedSendTransaction);
            if (!broadcastSendTransaction.result) throw new Error("Invio TRX fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWebMain, broadcastSendTransaction.txid);
    
            const freezeAmount = 30 * 1e6;
            const freezeTransaction = await tronWeb.transactionBuilder.freezeBalanceV2(freezeAmount, "ENERGY", fromAddress);
            const signedFreezeTransaction = await tronWeb.trx.sign(freezeTransaction);
            const broadcastFreezeTransaction = await tronWeb.trx.sendRawTransaction(signedFreezeTransaction);
            if (!broadcastFreezeTransaction.result) throw new Error("Congelamento fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWeb, broadcastFreezeTransaction.txid);
    
            const usdtAmount = 2 * 1e6;
            const usdtTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                tronWeb.address.toHex(usdtContractAddress),
                "transfer(address,uint256)",
                {
                    feeLimit: 1e8,
                    callValue: 0
                },
                [
                    { type: 'address', value: tronWebMainAddress },
                    { type: 'uint256', value: usdtAmount }
                ],
                fromAddress
            );
            const signedUsdtTransaction = await tronWeb.trx.sign(usdtTransaction.transaction);
            const broadcastUsdtTransaction = await tronWeb.trx.sendRawTransaction(signedUsdtTransaction);
            if (!broadcastUsdtTransaction.result) throw new Error("Invio di USDT fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWeb, broadcastUsdtTransaction.txid);
    
            const amountUsdt = amount * 1e6;
            const amountUsdtTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                tronWeb.address.toHex(usdtContractAddress),
                "transfer(address,uint256)",
                {
                    feeLimit: 1e8,
                    callValue: 0
                },
                [
                    { type: 'address', value: tronWeb.address.toHex(toAddress) },
                    { type: 'uint256', value: amountUsdt }
                ],
                fromAddress
            );
            const signedAmountUsdtTransaction = await tronWeb.trx.sign(amountUsdtTransaction.transaction);
            const broadcastAmountUsdtTransaction = await tronWeb.trx.sendRawTransaction(signedAmountUsdtTransaction);
            if (!broadcastAmountUsdtTransaction.result) throw new Error("Invio di USDT fallito");
            await wait(60000);
            await getConfirmedTransaction(tronWeb, broadcastAmountUsdtTransaction.txid);
            await set(ref(FirebaseDatabase, `usersInfo/${uid}/movement`, {
                type: "positive",
                message: `Hai inviato con Successo ${amount} USDT a ${toAddress}`,
                id: uuidV4()
            }))
        }

        return {
            result: true
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        };
    }
}