import { FirebaseDatabase } from "@/app/db/Firebase";
import { child, get, ref } from "firebase/database";

export default async function getUserFriends(uid) {
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