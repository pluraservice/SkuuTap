import { child, get, ref } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase";

export default async function getPrivateKeyFromCryptoName(uid, cryptoName, network) {
    try {
        const snapshot = (await get(child(ref(FirebaseDatabase), `wallets/portFolio/${uid}/wallets`))).val();
        const wallet = snapshot[cryptoName][network];
        const { privateKey } = wallet;
        return {
            result: true,
            private: privateKey,
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}