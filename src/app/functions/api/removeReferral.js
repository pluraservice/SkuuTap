import { ref, remove } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"

export async function removeReferral(refCode, referralUid) {
    try {
        await remove(ref(FirebaseDatabase, `usersInfo/${refCode}/referral/${referralUid}`));
        return {
            result: true
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}