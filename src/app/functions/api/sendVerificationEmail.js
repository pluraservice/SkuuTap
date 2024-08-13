import { FirebaseAuth } from "../../db/Firebase";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

export default async function sendVerificationEmail(email, password) {
    try {
        const user = (await signInWithEmailAndPassword(FirebaseAuth, email, password)).user;
        await sendEmailVerification(user);
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