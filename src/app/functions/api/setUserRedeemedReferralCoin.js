import { FirebaseDatabase } from "@/app/db/Firebase";
import { child, get, ref, set, update } from "firebase/database";

export default async function setUserRedeemedReferralCoin(uid, coinNumber) {
    try {
        const formattedDate = `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`;
        await set(ref(FirebaseDatabase, `skuuTapUsersInfo/${uid}/referralRedeemed`), {
            isRedeemed: true,
            date: formattedDate
        })
        const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
        await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + coinNumber });
        await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task6`), { redeemed: true })
        return {
            result: true,
            isRedeemed: true
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}