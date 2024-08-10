import { signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseAuth } from "../../db/Firebase"

export default async function loginAccount(email, password) {
    try {
        const userCredential = (await signInWithEmailAndPassword(FirebaseAuth, email, password)).user;
        return {
            result: true,
            data: userCredential
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}