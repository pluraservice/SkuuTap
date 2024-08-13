import { FirebaseDatabase } from "../../db/Firebase";
import { child, get, ref } from "firebase/database";
import { authenticator } from "otplib";

export default async function getOtpCodeIsCorrect(uid, insertedCode) {
    try {
        const authSecretSaved = (await get(child(ref(FirebaseDatabase), `authSecretCode/${uid}`))).val();
        if (authSecretSaved.secretCode) {
            const isValidInsertedCode = authenticator.check(insertedCode, authSecretSaved.secretCode);
            return {
                result: true,
                isValidCode: isValidInsertedCode
            }
        } else {
            return {
                result: false,
                error: 'Auth Otp Secret not Found'
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}