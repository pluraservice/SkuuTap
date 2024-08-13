import { child, get, ref, set } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase"

export default async function newReferralUserToUid(uid, email, password, referralCode) {
    try {
        const referralSnapshot = await get(child(ref(FirebaseDatabase), `usersInfo/${referralCode}/referral`));
        let referralData = referralSnapshot.val();

        if (!referralSnapshot.exists()) {
            referralData = {};
        }

        if (!referralData[uid]) {
            referralData[uid] = {
                email: email,
                password: password
            };
            await set(referralRef, referralData);
        }

        return {
            result: true
        };
    } catch (error) {
        return {
            result: false,
            error: error.message
        };
    }
}