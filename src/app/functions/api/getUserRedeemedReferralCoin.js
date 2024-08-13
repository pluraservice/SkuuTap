import { FirebaseDatabase } from "@/app/db/Firebase";
import { child, get, ref } from "firebase/database";

export default async function getUserRedeemedReferralCoin(uid) {
    try {
        const snapshotReferral = await get(child(ref(FirebaseDatabase), `skuuTapUsersInfo/${uid}/referralRedeemed`));
        if (!snapshotReferral.exists()) {
            return {
                result: true,
                isRedeemed: false
            }
        }

        const referenceDateStr = snapshotReferral.val().date;
        const [day, month, year] = referenceDateStr.split('/').map(Number);
        const referenceDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const monthsDifference = (currentDate.getFullYear() - referenceDate.getFullYear()) * 12 + (currentDate.getMonth() - referenceDate.getMonth());
        const isOneMonthPassed = monthsDifference >= 1 && currentDate.getDate() >= referenceDate.getDate();

        return {
            result: true,
            isRedeemed: isOneMonthPassed ? false : true
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}