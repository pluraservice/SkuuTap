import { child, get, ref } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"

export default async function getUserHaveCopyTrading(uid) {
    try {
        const userHaveCopy = (await get(child(ref(FirebaseDatabase), `wallets/copyTradingWallets/${uid}`))).exists();
        return {
            result: true,
            haveCopy: userHaveCopy
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}