import { FirebaseAuth } from "../../db/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function getUserHaveEmailVerified(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const user = userCredential.user;
        return {
            result: true,
            isVerified: user.emailVerified,
            data: user
        };
    } catch (error) {
        return {
            result: false,
            error: error.message
        };   
    }
}