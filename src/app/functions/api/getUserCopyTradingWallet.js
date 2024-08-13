import { child, get, ref } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"

export default async function getUserCopyTradingWallet(uid) {
    try {
        const snapshotCopyTradingWalletFromUid = (await get(child(ref(FirebaseDatabase), `wallets/copyTradingWallets/${uid}`))).val();
        return {
            result: true,
            data: snapshotCopyTradingWalletFromUid
        }
    } catch (error) {
        return {
            result: false, 
            error: error.message
        }
    }
}