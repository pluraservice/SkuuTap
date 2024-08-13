import { ref, set } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"
import importCopyTradingPhotoURLIntoStorage from "./importCopyTradingPhotoURLIntoStorage";

export default async function createCopyTradingAccount(uid, info) {
    try {
        let importCTPUrlStorage;
        if (info.photoURL) {importCTPUrlStorage = await importCopyTradingPhotoURLIntoStorage(uid, info.photoURL);}
        console.log(importCTPUrlStorage)
        await set(ref(FirebaseDatabase, `wallets/copyTradingWallets/${uid}`), {
            creationDate: (new Date().getDate()).toString().padStart(2, '0') + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getFullYear(),
            totalAssets: 0,
            copyTradingPL: 0,
            oldAssets: 0,
            followers: 0,
            pnl: 0,
            weekROI: 0,
            winRate: 0,
            name: info.name,
            photoURL: importCTPUrlStorage.url ? importCTPUrlStorage.url : "noPhotoURL",
            winOrder: 0,
            loseOrder: 0,
            followersInfo: [""],
            currentOrder: [""],
            badge: {
                veteran: false,
                highfrequency: false,
                highprofit: false,
                dayone: false,
            }
        })
        return {
            result: true
        }
    } catch (error) {
        console.log(error)
        return {
            result: false,
            error: error.message
        }
    }
}