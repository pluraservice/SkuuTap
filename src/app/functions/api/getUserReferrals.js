import { child, get, ref } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"

export default async function getUserReferrals(uid) {
    try {
        const referralSnapshot = (await get(child(ref(FirebaseDatabase), `usersInfo/${uid}/referral`))).val();
        return {
            result: true,
            data: referralSnapshot
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}