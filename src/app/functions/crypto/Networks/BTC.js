import axios from "axios";
import getUserAddressFromCryptoName from "../../api/getAddressFromCryptoName";
import { createRandom } from "coinkey";

export async function createBTCAddress() {
    try {
        const wallet = createRandom();
        return {
            result: true,
            data: {
                address: wallet.publicAddress,
                private: wallet.privateWif
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}

export async function getBTCWalletBalanceFromAddress(uid, cryptoName, network) {
    try {
        const address = (await getUserAddressFromCryptoName(uid, cryptoName, network)).address;
        const resGetBTCAddressBalance = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance?token=bf920658d41a4096ac991b571d0b0028`);
        return {
            result: true,
            balance: resGetBTCAddressBalance.data.balance
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}