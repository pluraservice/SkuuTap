import { FirebaseDatabase } from "../../db/Firebase";
import { set, ref } from "firebase/database"
import QRCode from "qrcode";
import { authenticator } from "otplib";

export default async function createOtpQRCode(uid, accountName) {
    try {
        const secretCodeDb = authenticator.generateSecret();
        const otpauth = authenticator.keyuri(accountName, "SkuuBit", secretCodeDb);
        await set(ref(FirebaseDatabase, `authSecretCode/${uid}`), {secretCode: secretCodeDb});
        const data_url = await QRCode.toDataURL(otpauth);
        return {
            result: true,
            secret: secretCodeDb,
            qrCodeUrl: data_url
        }
    } catch (error) {
        return {
            result: false, 
            error: error.message
        }
    }
}