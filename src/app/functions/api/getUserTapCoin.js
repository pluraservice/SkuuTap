import { FirebaseDatabase } from "@/app/db/Firebase"
import { child, get, ref } from "firebase/database"

export default async function getUserTapCoin(uid) {
    try {
        const userTapCoinGet = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}`))).val();
        return {
            result: true,
            coin: userTapCoinGet.coinNumber
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}