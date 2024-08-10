import { FirebaseAuth } from "@/app/db/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function getUser(email, password) {
    try {
        const userCredential = (await signInWithEmailAndPassword(FirebaseAuth, email, password)).user;
        return {
            result: true,
            data: userCredential
        }
    } catch (error) {
        return {
            result: true,
            error: error.message
        }
    }
}