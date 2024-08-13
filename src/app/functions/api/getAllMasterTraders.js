import { get, ref } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase";

export default async function getAllMasterTraders() {
    try {
        const copyTradingInfoList = [];
        const snapshot = await get(ref(FirebaseDatabase, 'wallets/copyTradingWallets'));
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const info = childSnapshot.val();
                copyTradingInfoList.push({
                    uid: childSnapshot.key,
                    creationDate: info.creationDate,
                    copyTradingPL: info.copyTradingPL,
                    currentOrder: info.currentOrder,
                    followers: info.followers,
                    followersInfo: info.followersInfo,
                    loseOrder: info.loseOrder,
                    name: info.name,
                    photoURL: info.photoURL,
                    oldAssets: info.oldAssets,
                    pnl: info.pnl,
                    totalAssets: info.totalAssets,
                    weekROI: info.weekROI,
                    winOrder: info.winOrder,
                    winRate: info.winRate,
                    badge: {
                        veteran: info.badge.veteran,
                        highfrequency: info.badge.highfrequency,
                        highprofit: info.badge.highprofit,
                        dayone: info.badge.dayone,
                    }
                });
            });
        }

        return {
            result: true,
            data: copyTradingInfoList
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}