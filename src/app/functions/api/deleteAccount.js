import { FirebaseAuth } from "../../db/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function deleteAccount(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        await userCredential.user.delete();
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