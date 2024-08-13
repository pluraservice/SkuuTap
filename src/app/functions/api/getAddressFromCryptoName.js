import { child, get, ref } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase";
import QRCode from 'qrcode'; 

export default async function getUserAddressFromCryptoName(uid, cryptoName, network) {
    try {
        const snapshot = (await get(child(ref(FirebaseDatabase), `wallets/portFolio/${uid}/wallets`))).val();
        const wallet = snapshot[cryptoName][network];
        const { address } = wallet;
        const qrCodeDataURL = await QRCode.toDataURL(address);
        return {
            result: true,
            address: address,
            qrCodeDataURL: qrCodeDataURL
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}